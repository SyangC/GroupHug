var Thankyou = require('../models/thankyou');

function thankyouIndex(req, res) {
  Thankyou.find()
    .then(function(thankyous) {
      res.status(200).json(thankyous)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function thankyouShow(req, res) {
  Thankyou.findById(req.params.id)
    .then(function(thankyou) {
      res.status(200).json(thankyou);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

// function thankyouCreate(req, res) {
//   Thankyou.create(req.body)
//     .then(function(thankyou) {
//       res.status(201).json(thankyou);
//     })
//     .catch(function(err) {
//       res.status(500).json(err);
//     });
// }

// function thankyouCreate(req, res) {
//   console.log("req.files before", req.files);
//   console.log("req.body before", req.body);
//   if(req.files !== undefined) {
//     req.body.pictures = Object.keys(req.files).map(function(key) {
//       return req.files[key].key;
//     });
//   }
//   console.log("req.files after", req.files);
//   console.log("req.body after", req.body);

//   Thankyou.create(req.body)
//     .then(function(thankyou) {
//       res.status(201).json(thankyou);
//     })
//     .catch(function(err) {
//       console.log(err);
//       res.status(500).json(err);
//     });
// }

// function thankyouUpdate(req, res) {
//   Thankyou.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(function(thankyou) {
//       res.status(200).json(thankyou);
//     })
//     .catch(function(err) {
//       res.status(500).json(err);
//     });
// }

function thankyouUpdate(req, res) {
  console.log("req.body", req.body);
  console.log("req.files", req.files);
  Thankyou.findById(req.params.id)
    .then(function(thankyou) {
      for(key in req.body) {
        thankyou[key] = req.body[key];
      }
      if(req.files) {
        var newImages = Object.keys(req.files).map(function(key) {
          return req.files[key].key;
        });
        thankyou.pictures = thankyou.pictures.concat(newImages);
      }
      return thankyou.save();
    })
    .then(function(thankyou) {
      res.status(200).json(thankyou);
    })
    .catch(function(err) {
      console.log("err is: ", err);
      res.status(500).json(err);
    });
}

function thankyouDelete(req, res) {
  Thankyou.findById(req.params.id)
    .then(function(thankyou) {
      return thankyou.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: thankyouIndex,
  show: thankyouShow,
  // create: thankyouCreate,
  update: thankyouUpdate,
  delete: thankyouDelete
}
