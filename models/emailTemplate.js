var mongoose = require("mongoose");

var emailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  html: { type: String, required: true },
  delay: { type: Number, default: 0 },
  insertableFields: {type: String}
});

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);