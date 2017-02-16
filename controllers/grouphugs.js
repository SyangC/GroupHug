var Grouphug = require('../models/grouphug');
var Thankyou = require('../models/thankyou');
var User = require('../models/user');
var email = require("../config/email");
var mailgun = require('../config/mailgun');
var EmailTemplate = require("../models/emailTemplate");
var schedule = require("node-schedule");
var messageArray = [];
var groupHugCreator ={}




function grouphugIndex(req, res) {
  Grouphug.find()
    .then(function(grouphugs) {
      res.status(200).json(grouphugs)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function grouphugShow(req, res) {
  Grouphug.findById(req.params.id)
    .populate ('creator')
    .populate('giftee')
    .populate('experiences.experienceId')
    .populate('contribution.contributionId')
    .then(function(grouphug) {
      res.status(200).json(grouphug);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function grouphugCreate(req, res) {
  console.log("req.files before", req.files);
  console.log("req.body before", req.body);
  if(req.files !== undefined) {
    req.body.pictures = Object.keys(req.files).map(function(key) {
      return req.files[key].key;
    });
  }
  console.log("req.files after", req.files);
  console.log("req.body after", req.body);
  Thankyou.create({})
    .then(function(thankyou) {
      console.log("thankyou: ", thankyou);
      req.body.thankyou = thankyou._id;
      Grouphug.create(req.body)
        .then(function(grouphug) {
          console.log(grouphug);
          res.status(201).json(grouphug);
        })
        .catch(function(err) {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
  // Grouphug.create(req.body)
  //   .then(function(grouphug) {
  //     res.status(201).json(grouphug);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
}

function grouphugUpdate(req, res) {
  console.log("req.body", req.body);
  console.log("req.body.experiences", req.body.experiences);
  console.log("req.files", req.files);

  Grouphug.findById(req.params.id)
    
    .then(function(grouphug) {
      
      for(key in req.body) {

        if(key === "experiences") {
          grouphug[key] = JSON.parse(req.body[key]);
        } 
        else if (key === "contributorEmailAddresses"){
          // Check ths evelaution to see if a new contributor has been added as we should only push in if new one added to avoid triggering emails every time a GH save or stop emails auto firing as per new work flow??
          var tempContributorEmailAddresses = (req.body[key]);
          
          if (grouphug[key].length === 0){
            grouphug[key].push(tempContributorEmailAddresses)
            createTempUser(tempContributorEmailAddresses, grouphug);
          }
          else{
            tempContributorEmailAddressesArray = tempContributorEmailAddresses.split(",");
              if(tempContributorEmailAddressesArray.length > grouphug[key].length ){
              console.log("tempcont length",tempContributorEmailAddressesArray.length," ",tempContributorEmailAddressesArray," grouphug length",grouphug[key].length," ",grouphug[key])
              grouphug[key].push(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1]);
              createTempUser(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1], grouphug);
            };
          }
          tempContributorEmailAddressesArray=[];
        }
        else if (key === "status" && req.body[key]==="active" && grouphug[key]!="active"){
          sendGroupHugActivationEmail(grouphug);
          grouphug[key] = req.body[key];

        }

      }
      if(req.files) {
        var newImages = Object.keys(req.files).map(function(key) {
          return req.files[key].key;
        });
        grouphug.pictures = grouphug.pictures.concat(newImages);
      }
      return grouphug.save();
    })
    .then(function(grouphug) {
      res.status(200).json(grouphug);
    })
    .catch(function(err) {
      console.log("err is: ", err);
      res.status(500).json(err);
    });
}

function grouphugDelete(req, res) {
  Grouphug.findById(req.params.id)
    .then(function(grouphug) {
      return grouphug.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function createTempUser(tempContributorEmailAddresses, grouphug){
  console.log("create temp user group hug", grouphug);
  console.log("test works", tempContributorEmailAddresses);
  var randomstring = Math.random().toString(36).slice(-15);
  console.log(randomstring);
  User.create({
    isActivated: "false",
    username: tempContributorEmailAddresses,
    email: tempContributorEmailAddresses,
    password: randomstring,
    passwordConfirmation: randomstring
  });
  creatorLookUp(grouphug);
  sendTempUserEmail(randomstring, tempContributorEmailAddresses, grouphug);
    
}  


//make creatorLookUp a directive to use mutlipletimes?
function creatorLookUp(grouphug){
  User.findOne({'_id' : grouphug.creator})
    .then(function(user, err){
      if(err){console.log("error------>",err)};
      console.log("^^^^Creator look up found^^^^", user)
      groupHugCreator.firstName = user.firstName;
      groupHugCreator.lastName = user.lastName;
      groupHugCreator.email = user.email;
    })
    .catch(function(err){
      console.log("Creator look up failed because", err);
      })

};

function sendTempUserEmail (randomstring, tempContributorEmailAddresses, grouphug){
  var date = new Date();
    EmailTemplate.findOne({'name': 'ContributorAdd'})
      .then(function(registrationEmail, messageArray) {

       /*add user look up uing GH id*/

        messageArray = mailgun.mailgunParse(registrationEmail);
        var messageText = ""

        for (var i = 0, len = messageArray.length; i < len; i++) {
          var messageSegment = messageArray [i];
          switch (messageSegment) {
            case "email":
             
             console.log("switching email");
             messageText = messageText + " "+tempContributorEmailAddresses;
              break;
            case "creatorFirstName":
              console.log("groupHugCreatorFirstName");
              messageText = messageText + " "+groupHugCreator.firstName;
              break;
            case "creatorLastName":
              console.log("groupHugCreatorLastName");
              messageText = messageText + " "+groupHugCreator.lastName;
              break;
            case "gifteeFirstName":
              console.log("gifteeFirstName");
              messageText = messageText + " "+grouphug.gifteeFirstName;
              break;
            case "gifteeLastName":
              console.log("gifteeLastName");
              messageText = messageText + " "+grouphug.gifteeLastName;
              break;
            case "password":
              console.log("switching password");
              messageText = messageText + " "+randomstring;
              break;
            case "newParagraph":
              console.log("adding line break");
              messageText = messageText + "<BR>";
              break;
            default:
               messageText = messageText+ messageSegment
               console.log("messageText builder", messageText)
          }
          console.log("Loooooooping",messageSegment);
        };

        var data = {
          from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
          to: tempContributorEmailAddresses,
          subject: "You have been invited to join group hug",
          html: messageText
        };

        mailgun.mailgunSend(data); 
        console.log('Tem User Email being sent', data);
           
     })
    .catch(function(err){
      console.log("Temp user Email did not send", err);
      })
}


function sendGroupHugActivationEmail (grouphug){
  creatorLookUp(grouphug);
  var date = new Date();
    EmailTemplate.findOne({'name': 'GHActivate'})
      .then(function(registrationEmail, messageArray) {

       /*add user look up uing GH id*/

        messageArray = mailgun.mailgunParse(registrationEmail);
        var messageText = ""

        for (var i = 0, len = messageArray.length; i < len; i++) {
          var messageSegment = messageArray [i];
          switch (messageSegment) {
            case "GHName":
             console.log("GHName");
             messageText = messageText + " "+grouphug.name;
              break;
            case "creatorFirstName":
              console.log("groupHugCreatorFirstName");
              messageText = messageText + " "+groupHugCreator.firstName;
              break;
            case "creatorLastName":
              console.log("groupHugCreatorLastName");
              messageText = messageText + " "+groupHugCreator.lastName;
              break;
            case "gifteeFirstName":
              console.log("gifteeFirstName");
              messageText = messageText + " "+grouphug.gifteeFirstName;
              break;
            case "gifteeLastName":
              console.log("gifteeLastName");
              messageText = messageText + " "+grouphug.gifteeLastName;
              break;
            case "password":
              console.log("switching password");
              messageText = messageText + " "+randomstring;
              break;
            case "newParagraph":
              console.log("adding line break");
              messageText = messageText +"<BR>";
              break;
            default:
               messageText = messageText+ messageSegment
               console.log("messageText builder", messageText)
          }
          console.log("Loooooooping",messageSegment);
        };

        var data = {
          from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
          to: groupHugCreator.email,
          subject: "Your Group Hug "+grouphug.name+" has been activated",
          html: messageText
        };

        mailgun.mailgunSend(data); 
        console.log('Activation email being sent', data);
           
     })
    .catch(function(err){
      console.log("Activiation Email did not send", err);
      })

  console.log("-----------------activation details------------------",grouphug);
}                                                    

module.exports = {
  index: grouphugIndex,
  show: grouphugShow,
  create: grouphugCreate,
  update: grouphugUpdate,
  delete: grouphugDelete
}
