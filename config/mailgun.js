var Promise = require("bluebird");
var api_key = process.env.MAILGUN_SECERET_KEY;
var domain = 'sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var User = require('../models/user');
var Grouphug = require('../models/grouphug');
var EmailTemplate = require("../models/emailTemplate");


 
function mailgunParse(template){
  var templateArray = template.html.split("|");
  console.log("this is template array from mailgun",templateArray);
  return templateArray;
};

function mailgunMail (message_type, message_address, message_subject, grouphug, grouphug_creator_firstName, grouphug_creator_lastName, grouphug_creator_email, user){

  var date = new Date();
  var messageArray =[];
    EmailTemplate.findOne({'name': message_type})
     
      .then(function(registrationEmail) {
        console.log("Send new user email",messageArray, user, grouphug);

        messageArray = mailgunParse(registrationEmail);
        var messageText = ""

        for (var i = 0, len = messageArray.length; i < len; i++) {
          var messageSegment = messageArray [i];
          switch (messageSegment) {
            case "GHName":
             messageText = messageText + " "+grouphug.name;
              break;
            case "email":
             messageText = messageText + " "+user.email;
              break;
            case "userFirstName":
             messageText = messageText + " "+user.firstName;
              break;
            case "userLastName":
             messageText = messageText + " "+user.lastName;
              break;
            case "createdAt":
              var today = new Date();
              var UTCstring = today.toUTCString()
              messageText = messageText + " "+ UTCstring;
               break;
            case "creatorFirstName":
              messageText = messageText + " "+grouphug_creator_firstName;
              break;
            case "creatorLastName":
              messageText = messageText + " "+grouphug_creator_lastName;
              break;
            case "gifteeFirstName":
              messageText = messageText + " "+grouphug.gifteeFirstName;
              break;
            case "gifteeLastName":
              messageText = messageText + " "+grouphug.gifteeLastName;
              break;
            case "password":
              messageText = messageText + " "+user.tempUserAccessKey;
              break;
            case "newParagraph":
              messageText = messageText + "<BR>";
              break;
            default:
               messageText = messageText+ messageSegment
          }
        
        };

        var data = {
          from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
          to: message_address,
          subject: message_subject,
          html: messageText
        };

        mailgunSend(data); 
        console.log('Email being sent', data);
        return
           
     })
    .catch(function(err){
      console.log("Email did not send", err);
      })
}

function mailgunSend (data){
  mailgun.messages().send(data, function (error, body) {
     console.log(body);
     if(!error){
       console.log("Mail Sent Successfully");
     }
     else {           
       console.log("Mail failed");
     }
   });
  };

  module.exports = {
    mailgunMail: mailgunMail,
    mailgunParse: mailgunParse,
    
  }