var mongoose = require("mongoose");

var experienceSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
  supplier: { type: String, required: true, maxlength: 100 }, // limited length to 100
  price: { type: Number, required: true },
  tags: { type:[{
    type: mongoose.Schema.ObjectId,
    ref: "Tag" }],
    validate: [ arrayLimit, '{PATH} exceeds the limit of 10' ]
    }, //limited number of tags to 10
  description: { type: String, required: true }
});

function arrayLimit(array) {
  return array.length <= 10;
}

module.exports = mongoose.model("Experience", experienceSchema);