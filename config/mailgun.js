var Promise = require("bluebird");


var api_key = process.env.MAILGUN_SECERET_KEY;
var domain = 'sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
function mailgunSend (){
   var data = {
     from: 'Mail Gun Test Group Hug <   postmaster@sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org>',
     to: 'julian.wyatt@me.com',
     subject: 'Hello',
     text: 'Jules is testing mailgun',
     html:"<b style='color:green'>Message:</b>"+'Jules is testing again'
   };
    

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
    mailgunSend: mailgunSend
  }