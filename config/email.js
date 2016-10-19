var Promise = require("bluebird");
var nodemailer = require("nodemailer");
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

var registerTemplate = transporter.templateSender({
  subject: '{{firstName }}, Welcome to GroupHug!',
  text: "This is the text version from GroupHug. Hi {{firstName}}, thank you for registering with us.",
  html: "<head><style>.body{background-color: #E4DFDA}h1{color: #4281a4}</style></head><body class='body'><h1>GroupHug</h1><br><h3>Hi {{firstName}}, thank you for registering with us.</h3></body>"
}, { from: process.env.GMAIL_ID });
  function sendRegisterTemplate(user) { 

  email = user.email;
  // Error handling
  firstName_in = user.firstName;
  if(firstName_in == undefined){firstName_in = ""};
  lastName_in = user.lastName;
  if(lastName_in  == undefined){lastName_in = ""};

  registerTemplate({
    to: email
  }, {
    firstName: firstName_in,
    lastName: lastName_in,
  }, function(err, info){
    if(err){
      console.log('Error', err);
    }else{
      console.log('Yeah, email sent!');
    }
  });
}

module.exports = {
  sendMail: function(mailOptions) {

    return new Promise(function(resolve, reject) {

      transporter.sendMail(mailOptions, function(err, info) {
        if(err) return reject(err);
        return resolve(info);
      });

    });
  },
  sendRegisterTemplate: sendRegisterTemplate
}