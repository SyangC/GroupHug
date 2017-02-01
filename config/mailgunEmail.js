var Promise = require("bluebird");
var schedule = require("node-schedule");
var nodemailer = require("nodemailer");
var EmailTemplate = require("../models/emailTemplate");
var mg = require("nodemailer-mailgun-transport");

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: process.env.MAILGUN_SECRET_KEY,
    domain: "mail.shutest.me"
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));


function sendRegisterTemplate(user) {
  email = user.email;
  // Error handling
  firstName_in = user.firstName;
  if(firstName_in == undefined){firstName_in = ""};
  lastName_in = user.lastName;
  if(lastName_in  == undefined){lastName_in = ""};
  createdAt_in = user.createdAt;
  if(createdAt_in  == undefined){createdAt_in = ""};

  nodemailerMailgun.sendMail({
    from: "julian.wyatt@julesjam.com",
    to: user.email,
    cc:,
    bcc:,
    subject: ,
    html: template.html,
    text: text.html
  }, function (err, info) {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Response: " + info);
    }
  });
}

module.exports = {
  sendMail: function(mailOptions) {

    return new Promise(function(resolve, reject) {

      registrationTransporter.sendMail(mailOptions, function(err, info) {
        if(err) return reject(err);
        return resolve(info);
      });

    });
  },
  sendRegisterTemplate: sendRegisterTemplate
}