var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var secret = require("../config/tokens").secret;
var mailgun = require('../config/mailgun');
var EmailTemplate = require("../models/emailTemplate");

function contributorCreate(req, res){
  console.log("Contributor req.body", req.body);
  var contributor_name = req.body.name;
  var contributor_email = req.body.email;
  var grouphug_Id = req.body.grouphug_Id



  if(contributor_email){
    console.log("contributor email received",contributor_email);
    existingUserTest(contributor_email, grouphug_Id, contributor_name);
    return res.status(200).json({ message: "Contributor successful" });

  }
  else{
    console.log("contributor email not received",contributor_email);
  }
  
}

function existingUserTest (contributor_email, grouphug_Id, contributor_name){
  User.findOne ({'email' : contributor_email})
    .then(function(user,err){
      if(user){
        if(user.invitations.indexOf(grouphug_Id)===-1){
          user.invitations.push(grouphug_Id);
          addContributorToGrouphug(grouphug_Id, user/*, user._id*/);
          return User.update({_id: user._id},{invitations: user.invitations});
        }
      }
      else if (!user)
        {
          console.log("create temp user group hug", grouphug_Id);
            console.log("test works", contributor_email, contributor_name);
            var randomstring = Math.random().toString(36).slice(-15);
            console.log(randomstring);
            User.create({
              isActivated: "false",
              tempUserAccessKey: randomstring,
              username: contributor_email,
              firstName: contributor_name,
              email: contributor_email,
              password: randomstring,
              passwordConfirmation: randomstring,
            })
            .then(function(user,err){
              console.log("New user created>>>>>>>>",user);
              user.invitations.push(grouphug_Id);
              addContributorToGrouphug(grouphug_Id, user/*, user._id*/);
              return User.update({_id: user._id},{invitations: user.invitations});
             
            })
            .catch(function(err){
              console.log("new user not created err",err);
            })

          
        }
      
    })
    .catch(function(err){
      console.log("catch invoked reason was >>>>>>",err);
    })

}




function addContributorToGrouphug(grouphug_Id, user/*, user_id*/){
  
  Grouphug.findById(grouphug_Id)
    .populate('creator')
    .then(function(grouphug, err){
      if(grouphug){
      console.log("found a group hug",grouphug,"<<<>>>adding user id ",user._id);
      console.log("Add contributor user detaisll&&&&&&&&",user);
      console.log("contributors",grouphug.contributors);
      if(grouphug.status ==="active"){
        if(user.isActivated){
          console.log("gonna send active user email now");
          mailgun.mailgunMail('ContributorInvitation', user.email, 'You have been invited to join GroupHug', grouphug, grouphug.creator.firstName, grouphug.creator.lastName, grouphug.creator.email, user );
        }
        else{
          console.log("gonna send new user email now");
          mailgun.mailgunMail('NewUserInvite',user.email, 'You have a new GroupHug invite', grouphug, grouphug.creator.firstName, grouphug.creator.lastName, grouphug.creator.email, user );
        }

        //MAybe this should be where the return passes to to ensure GH contributors are updated before processing invite updates - not working at moment
        for (i = 0; i < grouphug.contributors.length; i++ ){
          console.log("these are the contributors", grouphug.contributors[i].contributorId, grouphug.contributors[i].contributorStatus);
          grouphug.contributors[i].contributorStatus = "invite has been Sent";

        }
      }
      return Grouphug.update({_id: grouphug_Id},{$push:{'contributors':{contributorId: user._id}}});
      }
    })
    .catch(function(err){
      console.log(" add to contributor catch invoked reason was >>>>>>",err);
    })

}



module.exports = {
  contributorCreate: contributorCreate
}