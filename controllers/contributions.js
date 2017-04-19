var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');



function contributionAddMessage(req, res) {
  Contribution.findOne({_id: req.params.id})
    .then(function(contribution){
    contribution.message = req.body.message;
    contribution.displayName = req.body.name;
    return Contribution.update({_id: contribution._id},{displayName: req.body.name, message: req.body.message });
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