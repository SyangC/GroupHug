var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');



function contributionAddMessage(req, res) {
  console.log("req.body", req.body);
  console.log("req.params.id", req.params.id);
  Contribution.findOne({_id: req.params.id})
    .then(function(contribution){
    console.log(contribution);
    contribution.message = req.body.message;
    contribution.displayName = req.body.name
    return contribution.save();
    })
    .then(function(contribution) {
      res.status(200).json(contribution);
    })
    .catch(function(err) {
      console.log("err is: ", err);
      res.status(500).json(err);
    });
   
}

module.exports = {
  addMessage: contributionAddMessage
}