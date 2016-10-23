var EmailTemplate = require('../models/emailTemplate');

function emailTemplateIndex(req, res) {
  EmailTemplate.find()
    .then(function(emailTemplates) {
      res.status(200).json(emailTemplates)
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function emailTemplateShow(req, res) {
  EmailTemplate.findById(req.params.id)
    .then(function(emailTemplate) {
      res.status(200).json(emailTemplate);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function emailTemplateUpdate(req, res) {
  EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(emailTemplate) {
      res.status(200).json(emailTemplate);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: emailTemplateIndex,
  show: emailTemplateShow,
  update: emailTemplateUpdate
}
