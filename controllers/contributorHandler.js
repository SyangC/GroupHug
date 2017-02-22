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
    existingUserTest(contributor_email, grouphug_Id);

    return res.status(200).json({ message: "Contributor successful" });




  }
  else{
    console.log("contributor email not received",contributor_email);
  }
  
}

function existingUserTest (contributor_email, grouphug_Id){
  console.log("Hmmm text started");
  User.findOne ({'email' : contributor_email})
    .then(function(user,err){
      if(user){
        console.log("Need to add invite for User", user.firstName," ",user.lastName);
        console.log("current invitations",user.invitations);
        user.invitations.push(grouphug_Id);
        console.log("User invitation added",user);
        return User.update({_id: user._id},{invitations: user.invitations});

      }
      else {
        console.log("need to add user")
      }
    })
    .catch(function(err){
      console.log("catch invoked reason was >>>>>>",err);
    })

}



module.exports = {
  contributorCreate: contributorCreate
}