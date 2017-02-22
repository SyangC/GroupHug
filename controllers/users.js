var User = require('../models/user');

function userIndex(req, res) {
  User.find()
    .then(function(users) {
      res.status(200).json(users)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function userShow(req, res) {
  User.findById(req.params.id)
    .populate('invitations')
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function userEdit(req, res) {
  User.findById(req.params.id)
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}



function userUpdate(req, res) {
  console.log("req.body", req.body)
  /* -- this method does not update password -- 
  user = User.findByIdAndUpdate(req.params.id, req.body, { new: true })*/
  user = User.findById(req.params.id)
    .then(function(user){
      console.log('user before',user);
      for(key in req.body) user[key] = req.body[key];
      console.log('user after',user);
      return user.save();
    })
    .then(function(user) {
      console.log(user)
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}




module.exports = {
  index: userIndex,
  show: userShow,
  edit: userEdit,
  update: userUpdate,


}