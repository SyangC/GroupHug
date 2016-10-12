var Experience = require('../models/experience');

function experienceIndex(req, res) {
  Experience.find()
    .then(function(experiences) {
      res.status(200).json(experiences)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function experienceShow(req, res) {
  Experience.findById(req.params.id)
    .then(function(experience) {
      res.status(200).json(experience);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function experienceCreate(req, res) {
  Experience.create(req.body)
    .then(function(experience) {
      res.status(201).json(experience);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function experienceUpdate(req, res) {
  Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(experience) {
      res.status(200).json(experience);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function experienceDelete(req, res) {
  Experience.findById(req.params.id)
    .then(function(experience) {
      return experience.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: experienceIndex,
  show: experienceShow,
  create: experienceCreate,
  update: experienceUpdate,
  delete: experienceDelete
}
