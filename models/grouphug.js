var mongoose = require("mongoose");
var s3 = require('../config/s3');

var grouphugSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
  // description: { type: String, required: true },
  pictures: [{ type: String, required: true }],
  mainImage: {type: String, default: ""},
  creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  giftee: { type: mongoose.Schema.ObjectId, ref: "User" },
  gifteeFirstName: { type: String },
  gifteeLastName: { type: String },
  gifteeDisplayName: { type: String },
  gifteeEmailAddress: { type: String, required: true},
  gifteePostalTown: {type: String, required: true},
  gifteeContactNumber:{ type: String },
  gifteeAge: {type: String},
  gifteeGender: {type: String},
  occassion: {type: String},
  date: {type: Date},
  gifteeRelationship: {type: String},
  gifteeGroupSize: {type: String},
  question1: {type: String, default: "3"},
  question2: {type: String, default: "3"},
  question3: {type: String, default: "3"},
  question4: {type: String, default: "3"},
  question5: {type: String, default: "3"},
  question6: {type: String, default: "3"},
  question7: {type: String, default: "3"},
  question8: {type: String, default: "3"},
  question9: {type: String, default: "3"},
  question10: {type: String, default: "3"},
  question11: {type: String, default: "3"},
  creatorIdea: {type: String},
  gifteeMention: {type: String},
  gifteePassion: {type: String},
  contributors: [{
    contributorId: { type: mongoose.Schema.ObjectId, ref: "User" },
    contributorStatus: {type: String, default: "Invitation Pending"}
  }],
  contributorEmailAddresses: [],
  contributorEmail: {type: String},
  contributionTotal: { type: Number, default: 0 },
  status: { type: String, default: "inactive" },
  madelive: { type: Boolean, default: false},
  encouragementValue: {type: Number, default: 50},
  latestEncouragementValue: {type: Number, default: 0},
  experiences: [{
    experienceId: { type: mongoose.Schema.ObjectId, ref: "Experience" },
    userWeightings: [{ user: { type: mongoose.Schema.ObjectId, ref: "User" },
      weightValue: { type: Number, min: 1, max: 5 }, // between 1 and 5
    }] 
  }],
  // comments: [{
  //   name: { type: String },
  //   content: { type: String },
  //   added: { type: Date }
  // }]
  ecard: { type: mongoose.Schema.ObjectId, ref: "Ecard" },
  thankyou: { type: mongoose.Schema.ObjectId, ref: "Thankyou" },
  contributions: [{ type: mongoose.Schema.ObjectId, ref: "Contribution" }]
});


grouphugSchema.path('pictures')
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




grouphugSchema.pre('save', function(next) {
  
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

grouphugSchema.pre('remove', function(next) {
  
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

grouphugSchema.set('toJSON', { getters: true });




module.exports = mongoose.model("Grouphug", grouphugSchema);

