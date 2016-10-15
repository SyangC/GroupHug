var mongoose = require("mongoose");

var grouphugSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  giftee: { type: mongoose.Schema.ObjectId, ref: "User" },
  gifteeEmailAddress: { type: String },
  contributors: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  contributorEmailAdresses: [{ type: String }],
  contributionTotal: { type: Number, default: 0 },
  experiences: [{
    id: { type: mongoose.Schema.ObjectId, ref: "Experience" },
    userWeightings: [{ user: { type: mongoose.Schema.ObjectId, ref: "User" },
      weightValue: { type: Number, min: 1, max: 5 }, // between 1 and 5
    }] 
  }],
  comments: [{
    name: { type: String },
    content: { type: String },
    added: { type: Date }
  }]
});

module.exports = mongoose.model("Grouphug", grouphugSchema);

