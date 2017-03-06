var mongoose = require("mongoose");
var s3 = require('../config/s3');

var experienceSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
  supplier: { type: String, required: true, maxlength: 100 }, // limited length to 100
  price: { type: Number, required: true },
  pictures: [{ type: String, required: true }],
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

experienceSchema.path('pictures')
  .get(function(pictures) {
    return pictures.map(function(picture) {
      return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + picture;
    });
  })
  .set(function(pictures) {
    return pictures.map(function(picture) {
      return picture.split('/').splice(-1)[0];
    });
  });

experienceSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Experience", experienceSchema);