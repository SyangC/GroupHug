var Review = require('../models/review');

function reviewIndex(req, res) {
  Review.find()
    .then(function(reviews) {
      res.status(200).json(reviews)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function reviewShow(req, res) {
  Review.findById(req.params.id)
    .then(function(review) {
      res.status(200).json(review);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function reviewCreate(req, res) {
  Review.create(req.body)
    .then(function(review) {
      res.status(201).json(review);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function reviewUpdate(req, res) {
  Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(review) {
      res.status(200).json(review);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function reviewDelete(req, res) {
  Review.findById(req.params.id)
    .then(function(review) {
      return review.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: reviewIndex,
  show: reviewShow,
  create: reviewCreate,
  update: reviewUpdate,
  delete: reviewDelete
}
