var Promise = require("bluebird");


var api_key = process.env.MAILGUN_SECERET_KEY;
var domain = 'sandbox55d3a9aba14444049b77f477f8cdc4e1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
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
    mailgunSend: mailgunSend
  }