var schedule = require("node-schedule");
var email = require("./config/email");

var registrationDate = new Date();

var newDate = date.setSeconds(date.getSeconds() + 10);
var j = schedule.scheduleJob(newDate, function(){
  console.log('This works? Hopefully');
});



module.exports = {
  scheduleTask: function(delay, callback, ) {
,
  sendRegisterTemplate: sendRegisterTemplate
}