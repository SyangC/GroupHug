var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');
var jwt = require("jsonwebtoken");
var secret = require("../config/tokens").secret;

function contributorCreate(req, res){
  console.log("Contributor req.body", req.body);
}



module.exports = {
  contributorCreate: contributorCreate
}