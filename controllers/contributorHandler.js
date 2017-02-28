var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var secret = require("../config/tokens").secret;

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
          addContributorToGrouphug(grouphug_Id, user._id);
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
              addContributorToGrouphug(grouphug_Id, user._id);
              return User.update({_id: user._id},{invitations: user.invitations});
             
            })
            .catch(function(err){
              //put erraction here
              console.log("new user not created err",err);
            })

          
        }
      
    })
    .catch(function(err){
      console.log("catch invoked reason was >>>>>>",err);
    })

}




function addContributorToGrouphug(grouphug_Id, user_id){
  Grouphug.findById(grouphug_Id)
    .then(function(grouphug, err){
      if(grouphug){
      console.log("found a group hug",grouphug,"<<<>>>adding user id ",user_id);
      console.log("contributors",grouphug.contributors);
      grouphug.contributors.push(user_id);
      return Grouphug.update({_id: grouphug_Id},{contributors: grouphug.contributors});
      }
    })
    .catch(function(err){
      console.log("catch invoked reason was >>>>>>",err);
    })

}



module.exports = {
  contributorCreate: contributorCreate
}