var jwt = require("jsonwebtoken");
var Promise = require("bluebird");
var User = require("../models/user");
var secret = require("../config/tokens").secret;
var email = require("../config/email");
var EmailTemplate = require("../models/emailTemplate");
var schedule = require("node-schedule");

function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) res.send(500).json(err);
    if(!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    var payload = { _id: user._id, username: user.username, isActivated: user.isActivated, email: user.email };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: "Login successful!",
      token: token
    });
  });
}

function register(req, res) {
  User.create(req.body, function(err, user) {
    if(err) console.log(err);
    if(err) return res.status(400).json(err);

    var payload = { _id: user._id, username: user.username };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
    var date = new Date();
    // EmailTemplate.findOne({'name': 'Registration'})
    //   .then(function(registrationEmail) {
    //     var newDate = date.setSeconds(date.getSeconds() + registrationEmail.delay);
    //     email.sendRegisterTemplate(user);
    //     var j = schedule.scheduleJob(newDate, function(){
    //       email.sendRegisterTemplate(user);
    //       console.log('This works? Hopefully');
    //     });
        return res.status(200).json({
          message: "Thanks for registering!",
          token: token
        })        
      // })
      /*.catch(function(err) {
        console.log(err);
        res.status(500).json(err);
      });*/
    // var newDate = date.setSeconds(date.getSeconds() + registrationEmail.delay);
    // // email.sendRegisterTemplate(user);
    // var j = schedule.scheduleJob(newDate, function(){
    //   email.sendRegisterTemplate(user);
    //   console.log('This works? Hopefully');
    // });
    // return res.status(200).json({
    //   message: "Thanks for registering!",
    //   token: token
    // })
  });
}

module.exports = {
  login: login,
  register: register
}