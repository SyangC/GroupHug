var mongoose = require("mongoose");

var thankyouSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String, default: "inactive" },
  pictures: [{ type: String, required: true }]
});

thankyouSchema.path('pictures')
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

thankyouSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Thankyou", thankyouSchema);