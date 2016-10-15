var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
  experiences: [{ type: mongoose.Schema.ObjectId, ref: "Experience" }]
});

module.exports = mongoose.model("Tag", tagSchema);