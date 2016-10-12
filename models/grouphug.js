var mongoose = require("mongoose");

var grouphugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  giftee: { type: mongoose.Schema.ObjectId, ref: "User" },
  contributors: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Grouphug", grouphugSchema);