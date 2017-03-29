var mongoose = require("mongoose");

var contributionSchema = new mongoose.Schema({
  name: { type: String },
  stripeToken: { type: String },
  grouphug: { type: mongoose.Schema.ObjectId, ref: "Grouphug" },
  amount: { type: Number }
});

contributionSchema.pre('save', function(next) {
  
  var doc = this;

  this.model('Grouphug')
    .findById(this.grouphug)
    .then(function(grouphug) {
      if(!!grouphug && grouphug.contributions.indexOf(doc._id) === -1) {
        grouphug.contributions.push(doc._id);
        return grouphug.save(next);
      }
      next();
    });
});

contributionSchema.post('save', function(doc){
  console.log("saved document", doc);
  var doc = this;
  this.model('Grouphug')
    .findById(this.grouphug)
    .then(function(grouphug){
      if(!!grouphug) {
        grouphug.contributionTotal = grouphug.contributionTotal + doc.amount;
        sendMotivationMail(grouphug);
        return grouphug.save();
      }
    })
})


function sendMotivationMail(grouphug){
  console.log("case statements to go here for contribution motivation");
};
// contributionSchema.pre('remove', function(next) {
  
//   var doc = this;

//   this.model('User')
//     .findById(this.owner)
//     .then(function(owner) {
//       var index = owner.gamePosts.indexOf(doc._id);
//       if(index === -1) {
//         owner.gamePosts.splice(index, 1);
//         return owner.save(next);
//       }
//       next();
//     });
// });

contributionSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Contribution", contributionSchema);

