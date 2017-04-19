var Grouphug = require('../models/grouphug');
var Thankyou = require('../models/thankyou');
var User = require('../models/user');
var email = require("../config/email");
var mailgun = require('../config/mailgun');
var EmailTemplate = require("../models/emailTemplate");
var schedule = require("node-schedule");







function grouphugIndex(req, res) {
  Grouphug.find()
    .populate('contributors.contributorId')
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
    .populate('contributors.contributorId')
    .populate('experiences.experienceId')
    .populate('contributions')
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
  console.log("req.transforms[1]----->>>>>",req.files[0].transforms);
 /* if(req.files !== undefined) {
    req.body.pictures = Object.keys(req.files[0].transforms).map(function(key) {
      return req.files[0].transforms.key;
    });
  }*/
   if(req.files[0].transforms !== undefined) {
    req.body.pictures = [];
     for(i = 0; i < req.files[0].transforms.length; i++){
      req.body.pictures.push(req.files[0].transforms[i].key);
      if (req.files[0].transforms[i].id === 'main'){
        req.body.mainImage = req.files[0].transforms[i].key;
      }
     }
   }
  console.log("req.files after", req.files);
  console.log("req.body after", req.body);
  console.log("req.pictures----->>>>>",req.body.pictures);
  console.log("req.transforms----->>>>>",req.body.transforms);
  var user = {};
  User.findOne ({'email' : req.body.gifteeEmailAddress})
    .then(function(user, err){
      if(user){
       console.log("<<<<GIFTEE EXISTS>>>>", user._id)
       createGroupHug(req, res, user);
      }
      else if (!user)
      { 
      console.log("creating temp giftee user");
      var randomstring = Math.random().toString(36).slice(-15);
      console.log(randomstring);
      User.create({
        isActivated: "false",
        tempUserAccessKey: randomstring,
        firstName: req.body.gifteeFirstName,
        lastName: req.body.gifteeLastNAme,
        email: req.body.gifteeEmailAddress,
        password: randomstring,
        passwordConfirmation: randomstring,
        })
        .then(function(user, err){
          
          console.log("giftee id is",user._id);
          console.log("giftee......", user);
          createGroupHug(req, res, user);
        })
        .catch(function(err){
          console.log("giftee user creation failed", err)
        })
      }

    })
    
  .catch(function(err){
    console.log("new user not created err",err);
  });        
};

   


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
    
        else if (key === "status" && req.body[key]==="active" && grouphug[key]!="active"){
         
          mailgun.mailgunMail('GHActivate', grouphug_creator_email, "Your Group Hug "+grouphug.name+" has been activated", grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email);

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




function sendGroupHugInvitations(grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email){
  console.log("Invitees",grouphug.contributors);
  for (i = 0; i < grouphug.contributors.length; i++ ){
    console.log("invtees", grouphug.contributors[i].contributorId);
    User.findById(grouphug.contributors[i].contributorId)
      .then(function(user){
        console.log("invitee name", user.firstName, user.lastName, "activated", user.isActivated);
        if(user){
          if(user.isActivated){
            console.log("Send group hug user invitation");
            mailgun.mailgunMail('ContributorInvitation', user.email, 'You have been invited to join GroupHug', grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user );
            console.log("this is the gh invite updater #####",grouphug)
            
          }

          else {
            mailgun.mailgunMail('NewUserInvite',user.email, 'You have a new GroupHug invite', grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user );
          }

          for (i = 0; i < grouphug.contributors.length; i++ ){
            console.log("these are the contributors", grouphug.contributors[i].contributorId, grouphug.contributors[i].contributorStatus);
            grouphug.contributors[i].contributorStatus = "invite has been Sent";

          }
        }
        else{
          console.log("UNIDENTIFIED USER", grouphug_contributors[i] );
        }
        grouphug.save();
    })
  }
};


function addGroupHugToCreator (req, grouphug){
  User.findById (req.body.creator)
    .then(function(user,err){
      if(user){
        console.log(">>>>>>PUSHING Grouphug ID", grouphug._id, "into user ", user.email);
        user.grouphugs.push(grouphug._id);
        return User.update({_id: user._id},{grouphugs: user.grouphugs});
      }
      else {
        console.log("User Not found");
      }
    })
    .catch(function(err){
      console.log("new user not created err",err);
    });

};

function addGroupHugToGiftee(grouphug){
    User.findById (grouphug.giftee)
      .then(function(user,err){
        if(user){
          console.log(">>>>>>PUSHING Grouphug ID to giftee", grouphug._id, "into giftee ", user.email);
          user.gifts.push(grouphug._id);
          return User.update({_id: user._id},{gifts: grouphug._id});
        }
        else {
          console.log("Giftee Not found");
        }
      })
      .catch(function(err){
        console.log("Gift not added to giftee",err);
      });
};

function createGroupHug(req, res, user){
  req.body.giftee = user._id;
    Thankyou.create({})
      .then(function(thankyou) {
        console.log("thankyou: ", thankyou);
        req.body.thankyou = thankyou._id;
        Grouphug.create(req.body)
        .then(function(grouphug) {
          addGroupHugToCreator(req, grouphug);
          addGroupHugToGiftee(grouphug);
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






module.exports = {
  index: grouphugIndex,
  show: grouphugShow,
  create: grouphugCreate,
  update: grouphugUpdate,
  delete: grouphugDelete,
}
