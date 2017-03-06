var mongoose = require("mongoose");
var s3 = require('../config/s3');

var ecardSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 }, // limited length to 100
  description: { type: String, required: true },
  pictures: [{ type: String, required: true }],
  grouphug: { type: mongoose.Schema.ObjectId, ref: "Grouphug" }
});


ecardSchema.path('pictures')
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


ecardSchema.pre('save', function(next) {
  
  var doc = this;

  this.model('User')
    .findById(this.owner)
    .then(function(owner) {
      if(!!owner && owner.gamePosts.indexOf(doc._id) === -1) {
        owner.gamePosts.push(doc._id);
        return owner.save(next);
      }
      next();
    });
});

ecardSchema.pre('remove', function(next) {
  
  var doc = this;

  this.model('User')
    .findById(this.owner)
    .then(function(owner) {
      var index = owner.gamePosts.indexOf(doc._id);
      if(index === -1) {
        owner.gamePosts.splice(index, 1);
        return owner.save(next);
      }
      next();
    });
});

ecardSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Ecard", ecardSchema);

