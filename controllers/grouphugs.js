var Grouphug = require('../models/grouphug');
var Thankyou = require('../models/thankyou');
var User = require('../models/user');
var email = require("../config/email");
var mailgun = require('../config/mailgun');
var EmailTemplate = require("../models/emailTemplate");
var schedule = require("node-schedule");





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
    .populate('contributors')
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
}

function grouphugUpdate(req, res) {
  console.log("req.body", req.body);
  console.log("req.body.experiences", req.body.experiences);
  console.log("req.files", req.files);
  

  Grouphug.findById(req.params.id)
    .populate('creator')
    .then(function(grouphug) {
      
      var grouphug_creator_firstName = grouphug.creator.firstName;
      var grouphug_creator_lastName = grouphug.creator.lastName;
      var grouphug_creator_email = grouphug.creator.email;
      var grouphug_id =grouphug._id;
      console.log("okkkkkk lets try this".grouphug_creator);
      for(key in req.body) {

        if(key === "experiences") {
          grouphug[key] = JSON.parse(req.body[key]);
        } 
      /*  else if (key === "contributorEmailAddresses"){
          // Check ths evelaution to see if a new contributor has been added as we should only push in if new one added to avoid triggering emails every time a GH save or stop emails auto firing as per new work flow??
          var tempContributorEmailAddresses = (req.body[key]);
          
          if (grouphug[key].length === 0){
            grouphug[key].push(tempContributorEmailAddresses)
            create(tempContributorEmailAddresses, grouphug);
          }
          else{
            tempContributorEmailAddressesArray = tempContributorEmailAddresses.split(",");
              if(tempContributorEmailAddressesArray.length > grouphug[key].length ){
              console.log("tempcont length",tempContributorEmailAddressesArray.length," ",tempContributorEmailAddressesArray," grouphug length",grouphug[key].length," ",grouphug[key])
              grouphug[key].push(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1]);
              create(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1], grouphug);
            };
          }
          tempContributorEmailAddressesArray=[];
        }*/
        else if (key === "status" && req.body[key]==="active" && grouphug[key]!="active"){
          sendGroupHugActivationEmail(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email);
          console.log("CONTRIBUTORS",grouphug.contributors);
          sendGroupHugInvitations(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email);
          grouphug[key] = req.body[key];

        }
        else if(key != "contributions" && key != "contributors"){

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



function sendEmail (message_type, user, grouphug, grouphug_creator_firstName, grouphug_creator_lastName){

  var date = new Date();
  var messageArray =[123];
    EmailTemplate.findOne({'name': message_type})
     
      .then(function(registrationEmail) {
        console.log("Send new user email",messageArray, user, grouphug);

        messageArray = mailgun.mailgunParse(registrationEmail);
        var messageText = ""

        for (var i = 0, len = messageArray.length; i < len; i++) {
          var messageSegment = messageArray [i];
          switch (messageSegment) {
            case "email":
             console.log("switching email",user.email);
             messageText = messageText + " "+user.email;
              break;
            case "userFirstName":
             
             console.log("switching userFirstName",user.firstName);
             messageText = messageText + " "+user.firstName;
              break;
            case "creatorFirstName":
              console.log("groupHugCreatorFirstName");
              messageText = messageText + " "+grouphug_creator_firstName;
              break;
            case "creatorLastName":
              console.log("groupHugCreatorLastName");
              messageText = messageText + " "+grouphug_creator_lastName;
              break;
            case "gifteeFirstName":
              console.log("gifteeFirstName",grouphug.gifteeFirstName);
              messageText = messageText + " "+grouphug.gifteeFirstName;
              break;
            case "gifteeLastName":
              console.log("gifteeLastName",grouphug.gifteeLastName);
              messageText = messageText + " "+grouphug.gifteeLastName;
              break;
            case "password":
              console.log("switching password",user.tempUserAccessKey);
              messageText = messageText + " "+user.tempUserAccessKey;
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
          to: user.email,
          subject: "You have been invited to join group hug",
          html: messageText
        };

        mailgun.mailgunSend(data); 
        console.log('Email being sent', data);
           
     })
    .catch(function(err){
      console.log("Email did not send", err);
      })
}
function sendGroupHugInvitations(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email){
  console.log("Invitees",grouphug.contributors);
  for (i = 0; i < grouphug.contributors.length; i++ ){
    console.log("invtees", grouphug.contributors[i]);
    User.findById(grouphug.contributors[i])
      .then(function(user){
        console.log("invitee name", user.firstName, user.lastName, "activated", user.isActivated);
        if(user){
          if(user.isActivated){
            var message_type = 'ContributorInvitation'
            console.log("Send group hug user invitation");
            sendEmail(message_type, user, grouphug, grouphug_creator_firstName, grouphug_creator_lastName );
          }
          else {
            var message_type = 'NewUserInvite'
            sendEmail(message_type, user, grouphug, grouphug_creator_firstName, grouphug_creator_lastName );
          }
        }
        else{
          console.log("UNIDENTIFIED USER", grouphug_contributors[i] );
        }
      })
  }
};

function sendGroupHugActivationEmail (grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email){
 
  var date = new Date();
  var messageArray = [];
  console.log("this is the grouphug!!!!!",grouphug);
  console.log("this is the linked user????",grouphug.creator.firstName);
  console.log("this is the grouphug creator......", grouphug_creator_firstName, grouphug_creator_lastName)
 
    EmailTemplate.findOne({'name': 'GHActivate'})
      .then(function(registrationEmail) {

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
              messageText = messageText + " "+grouphug_creator_firstName;
              break;
            case "creatorLastName":
              console.log("groupHugCreatorLastName");
              messageText = messageText + " "+grouphug_creator_lastName;
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
         
        };

        var data = {
          from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
          to: grouphug_creator_email,
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
  delete: grouphugDelete,
}
