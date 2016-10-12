var mongoose = require("mongoose");

var experienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Experience", experienceSchema);