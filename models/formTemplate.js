var mongoose = require("mongoose");

var formTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true }
  questions: [{ type:String }]
});

module.exports = mongoose.model("EmailTemplate", formTemplateSchema);