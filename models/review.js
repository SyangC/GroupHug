var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 }, // limited length to 100
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // between 1 and 5
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  experience: { type: mongoose.Schema.ObjectId, ref: "Experience", required: true },
  added: { type: Date }
});

module.exports = mongoose.model("Review", reviewSchema);