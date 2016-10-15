var Tag = require('../models/tag');

function tagIndex(req, res) {
  Tag.find()
    .then(function(tags) {
      res.status(200).json(tags)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function tagShow(req, res) {
  Tag.findById(req.params.id)
    .then(function(tag) {
      res.status(200).json(tag);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function tagCreate(req, res) {
  Tag.create(req.body)
    .then(function(tag) {
      res.status(201).json(tag);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function tagUpdate(req, res) {
  Tag.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(tag) {
      res.status(200).json(tag);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function tagDelete(req, res) {
  Tag.findById(req.params.id)
    .then(function(tag) {
      return tag.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: tagIndex,
  show: tagShow,
  create: tagCreate,
  update: tagUpdate,
  delete: tagDelete
}
