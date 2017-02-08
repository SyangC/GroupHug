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
    .populate('experiences.experienceId')
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

        else {
          console.log("Ok to line 94",key,"value", req.body[key]);
          if(key === "contributions" && req.body[key]===""){
            grouphug[key] =[];
          }
          else{
          grouphug[key] = req.body[key];
          }
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
  user = ({email: tempContributorEmailAddresses});
  var date = new Date();
  var data = {
    from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
    to: tempContributorEmailAddresses,
    subject: 'You have been invited to join a group hug for '+grouphug.gifteeFirstName+' '+grouphug.gifteeLastName,
    text: 'You are invited you to take part in a group hug for '+grouphug.gifteeFirstName+' '+grouphug.gifteeLastName +' To take part you will need to sign into group hug using '+tempContributorEmailAddresses+" as your username and "+randomstring +" as you temporray password. Please go to localhost:3000 to login. Many thanks the Lovely people at Group Hug" /*,
    html:"<b style='color:green'>Message:</b>"+'Jules is testing again'*/
  };
  console.log("mailgun send creator contains",grouphug.name);
  mailgun.mailgunSend(data);
/*
    EmailTemplate.findOne({'name': 'Registration'})
      .then(function(registrationEmail) {
        var newDate = date.setSeconds(date.getSeconds() + registrationEmail.delay);
        email.sendRegisterTemplate(user);
        var j = schedule.scheduleJob(newDate, function(){
          email.sendRegisterTemplate(user);
          console.log('This works? Hopefully');
        });    
     })
    .catch(function(){
      console.log("ooh that wen wrong;");
    })*/
    
}                                                       

module.exports = {
  index: grouphugIndex,
  show: grouphugShow,
  create: grouphugCreate,
  update: grouphugUpdate,
  delete: grouphugDelete
}
