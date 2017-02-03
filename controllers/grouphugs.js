var Grouphug = require('../models/grouphug');
var Thankyou = require('../models/thankyou');
var User = require('../models/user');
var email = require("../config/email");
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
        else if (key === "contributorEmailAddresses" && req.body[key].length > grouphug[key].length){
          // Check ths evelaution to see if a new contributor has been added as we should only push in if new one added to avoid triggering emails every time a GH save or stop emails auto firing as per new work flow??
          var tempContributorEmailAddresses = (req.body[key]);
          
          if (grouphug[key].length === 0){
            grouphug[key].push(tempContributorEmailAddresses)
            createTempUser(tempContributorEmailAddresses);
          }
          else{
            tempContributorEmailAddressesArray = tempContributorEmailAddresses.split(",");
            grouphug[key].push(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1]);
            createTempUser(tempContributorEmailAddressesArray[tempContributorEmailAddressesArray.length-1]);
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

function createTempUser(tempContributorEmailAddresses){
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
    })
    
}                                                       

module.exports = {
  index: grouphugIndex,
  show: grouphugShow,
  create: grouphugCreate,
  update: grouphugUpdate,
  delete: grouphugDelete
}
