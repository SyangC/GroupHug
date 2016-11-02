var FormTemplate = require('../models/formTemplate');

function formTemplateIndex(req, res) {
  FormTemplate.find()
    .then(function(formTemplates) {
      res.status(200).json(formTemplates)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function formTemplateShow(req, res) {
  FormTemplate.findById(req.params.id)
    .then(function(formTemplate) {
      res.status(200).json(formTemplate);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function formTemplateUpdate(req, res) {
  FormTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(formTemplate) {
      res.status(200).json(formTemplate);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: formTemplateIndex,
  show: formTemplateShow,
  update: formTemplateUpdate
}
