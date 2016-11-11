var Ecard = require('../models/ecard');

function ecardIndex(req, res) {
  Ecard.find()
    .then(function(ecards) {
      res.status(200).json(ecards)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function ecardShow(req, res) {
  Ecard.findById(req.params.id)
    .then(function(ecard) {
      res.status(200).json(ecard);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

// function ecardCreate(req, res) {
//   Ecard.create(req.body)
//     .then(function(ecard) {
//       res.status(201).json(ecard);
//     })
//     .catch(function(err) {
//       res.status(500).json(err);
//     });
// }

function ecardCreate(req, res) {
  req.body.pictures = Object.keys(req.files).map(function(key) {
    return req.files[key].key;
  });
  Ecard.create(req.body)
    .then(function(ecard) {
      res.status(201).json(ecard);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

// function ecardUpdate(req, res) {
//   Ecard.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(function(ecard) {
//       res.status(200).json(ecard);
//     })
//     .catch(function(err) {
//       res.status(500).json(err);
//     });
// }

function ecardUpdate(req, res) {  
  Ecard.findByIdAndUpdate(req.params.id, req.body)
    .then(function(ecard) {
      for(key in req.body) ecard[key] = req.body[key];
      if(req.files) {
        var newImages = Object.keys(req.files).map(function(key) {
          return req.files[key].key;
        });
        ecard.pictures = ecard.pictures.concat(newImages);
      }
      return ecard.save();
    })
    .then(function(ecard) {
      res.status(200).json(ecard);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function ecardDelete(req, res) {
  Ecard.findById(req.params.id)
    .then(function(ecard) {
      return ecard.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: ecardIndex,
  show: ecardShow,
  create: ecardCreate,
  update: ecardUpdate,
  delete: ecardDelete
}
