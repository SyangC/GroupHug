var schedule = require("node-schedule");
var email = require("./config/mailgunEmail");

var registrationDate = new Date();

var newDate = date.setSeconds(date.getSeconds() + 10);
var j = schedule.scheduleJob(newDate, function(){
  console.log('This works? Hopefully');
});



module.exports = {
  sendRegisterTemplate: sendRegisterTemplate
}