var Promise = require("bluebird");
var schedule = require("node-schedule");
var nodemailer = require("nodemailer");
var EmailTemplate = require("../models/emailTemplate");
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD
  }
};

function sendRegisterTemplate(user) {
  EmailTemplate.findOne({'name': 'Registration'})
    .then(function(template) {
      var registrationTransporter = nodemailer.createTransport(smtpConfig);

      var registerTemplate = registrationTransporter.templateSender({
        subject: template.subject,
        text: template.text,
        html: template.html
      }, { from: process.env.GMAIL_ID });

      email = user.email;
      // Error handling
      firstName_in = user.firstName;
      if(firstName_in == undefined){firstName_in = ""};
      lastName_in = user.lastName;
      if(lastName_in  == undefined){lastName_in = ""};
      createdAt_in = user.createdAt;
      if(createdAt_in  == undefined){createdAt_in = ""};

      registerTemplate({
        to: email
      }, {
        firstName: firstName_in,
        lastName: lastName_in,
        createdAt: createdAt_in
      }, function(err, info){
        if(err){
          console.log('Error', err);
        }else{
          console.log('Yeah, email sent!');
        }
      });
    })
    .catch(function(err) {
      console.log('Error', err);
      res.status(500).json(err);
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