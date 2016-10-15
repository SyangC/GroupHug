var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 6, maxlength: 100 }, // between 6 and 100
  firstName: { type: String, required: true, maxlength: 100 }, // limited length to 100
  lastName: { type: String, required: true, maxlength: 100 }, // limited length to 100
  avatar: { type: String, default: "http://swingmaresme.com/wp-content/uploads/2015/03/avant.png" }, 
  DOB: { type: Date },
  email: { type: String, reqiured: true },
  githubId: { type: String },
  facebookId: { type: String },
  twitterId: { type: String },
  pinterestId: { type: String },
  instagramId: { type: String },
  passwordHash: { type: String },
  credit: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }], 
  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }] 
});

userSchema.pre("validate", function(next) {
  if(!this._password && !this.githubId && !this.facebookId && !this.twitterId && !this.pinterestId && !this.instagramId) {
    this.invalidate('password', 'A password is required');
  }
  next();
});

userSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual("passwordConfirmation")
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path("passwordHash")
  .validate(function(passwordHash) {
    if(this.isNew) {
      if(!this._password) {
        return this.invalidate("password", "A password is required");
      }

      if(this._password !== this._passwordConfirmation) {
        return this.invalidate("passwordConfirmation", "Passwords do not match");
      }
    }
  });

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model("User", userSchema);