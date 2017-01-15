var Grouphug = require('../models/grouphug');
var User = require('../models/User');


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

  Grouphug.create(req.body)
    .then(function(grouphug) {
      res.status(201).json(grouphug);
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
    
    .then(function(grouphug) {
      
      for(key in req.body) {
        if(key === "experiences") {
          grouphug[key] = JSON.parse(req.body[key]);
        } 
        else if (key === "contributorEmailAddresses"){
          
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
}                                                       

module.exports = {
  index: grouphugIndex,
  show: grouphugShow,
  create: grouphugCreate,
  update: grouphugUpdate,
  delete: grouphugDelete
}
