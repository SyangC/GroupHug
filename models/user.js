var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  isActivated: {type: Boolean, default: true},
  role: {type: String, default: "user"},
  visits: {type: Number, default: 0},
  lastVisitDate: {type: Date},
  tempUserAccessKey: {type: String},
  /*username: { type: String, required: true, minlength: 6, maxlength: 100 },*/ // Username depricated
  firstName: { type: String, maxlength: 100 }, // limited length to 100
  lastName: { type: String, maxlength: 100 }, // limited length to 100
  displayName: { type: String, maxlength: 100},
  avatar: { type: String, default: "http://swingmaresme.com/wp-content/uploads/2015/03/avant.png" }, 
  DOB: { type: Date },
  gender: {type: String},
  contactNumber: {type: String, maxlength: 12},
  email: { type: String, reqiured: true, unique: true },
  githubId: { type: String },
  facebookId: { type: String },
  twitterId: { type: String },
  pinterestId: { type: String },
  instagramId: { type: String },
  passwordHash: { type: String },
  credit: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }], 
  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
  invitations: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug"}],
  gifts: [{type: mongoose.Schema.ObjectId, ref: "Grouphug"}],
  createBy: [{type: String, default: "Self"}],
  createdAt: { type: Date, default: new Date },
  loggedIn: Boolean
});

userSchema.pre("validate", function(next) {
  if(!this._password && !this.githubId && !this.facebookId && !this.twitterId && !this.pinterestId && !this.instagramId) {
    this.invalidate('password', 'A password is required');
    console.log("password validation failed");
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