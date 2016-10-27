/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var express = __webpack_require__(1);
	var app = express();
	var path = __webpack_require__(2);
	var morgan = __webpack_require__(3);
	var mongoose = __webpack_require__(4);
	var bluebird = __webpack_require__(5);
	var cors = __webpack_require__(6);
	var http = __webpack_require__(7);
	var bodyParser = __webpack_require__(8);
	var cookieParser = __webpack_require__(9);

	var webpack = __webpack_require__(10);

	var routes = __webpack_require__(11);

	// *** config file *** //
	var config = __webpack_require__(34);

	var environment = app.get("env");

	var port = process.env.PORT || 3000;
	var databaseUri = __webpack_require__(35)(environment);

	mongoose.Promise = bluebird;
	mongoose.connect(databaseUri);

	if ("test" !== environment) {
	  app.use(morgan("dev"));
	}

	app.use(cors());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.use(express.static("public"));

	app.use("/api", routes);

	var server = app.listen(port, function () {
	  console.log("Node running on port 3000, Cap'n.");
	});

	module.exports = app;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var router = __webpack_require__(1).Router();

	var facebookController = __webpack_require__(12);
	var twitterController = __webpack_require__(18);
	var authController = __webpack_require__(20);
	var usersController = __webpack_require__(25);
	var grouphugsController = __webpack_require__(26);
	var experiencesController = __webpack_require__(28);
	var reviewsController = __webpack_require__(30);
	var tagsController = __webpack_require__(32);

	var jwt = __webpack_require__(16);
	var secret = __webpack_require__(17).secret;

	function secureRoute(req, res, next) {
	  if (!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

	  var token = req.headers.authorization.replace("Bearer ", "");

	  jwt.verify(token, secret, function (err, payload) {
	    if (err || !payload) return res.status(401).json({ message: "Unauthorized" });

	    req.user = payload;
	    next();
	  });
	}

	router.route('/').get(grouphugsController.index);

	router.route('/grouphugs').get(grouphugsController.index).post(grouphugsController.create);

	router.route("/grouphugs/:id").get(grouphugsController.show).put(grouphugsController.update).delete(grouphugsController.delete);

	router.route('/experiences').get(experiencesController.index).post(experiencesController.create);
	router.route("/experiences/:id").get(experiencesController.show).put(experiencesController.update).delete(experiencesController.delete);

	router.route('/reviews').get(reviewsController.index).post(reviewsController.create);
	router.route("/reviews/:id").get(reviewsController.show).put(reviewsController.update).delete(reviewsController.delete);

	router.route('/tags').get(tagsController.index).post(tagsController.create);
	router.route("/tags/:id").get(tagsController.show).put(tagsController.update).delete(tagsController.delete);

	router.get("/users", usersController.index);
	router.route("/users/:id").get(usersController.show).put(usersController.update);

	router.post("/oauth/facebook", facebookController.login);
	router.post("/oauth/twitter", twitterController.login);
	router.post("/login", authController.login);
	router.post("/register", authController.register);

	module.exports = router;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var User = __webpack_require__(13);
	var request = __webpack_require__(15);
	var jwt = __webpack_require__(16);
	var secret = __webpack_require__(17).secret;

	function login(req, res) {

	  request.post({
	    url: "https://graph.facebook.com/v2.5/oauth/access_token",
	    qs: {
	      client_id: process.env.FACEBOOK_API_KEY,
	      client_secret: process.env.FACEBOOK_API_SECRET,
	      code: req.body.code,
	      redirect_uri: "https://localhost3000/"
	    },
	    json: true
	  }).then(function (access_token) {
	    return request.get({
	      url: "https://graph.facebook.com/v2.5/me?fields=id,email,name,picture",
	      qs: access_token,
	      json: true
	    });
	  }).then(function (profile) {
	    return User.findOne({ email: profile.email }).then(function (user) {
	      if (user) {
	        user.username = profile.name;
	        user.facebookId = profile.id;
	        user.avatar = profile.picture ? profile.picture.data.url : null;
	      } else {
	        user = new User({
	          username: profile.name,
	          email: profile.email,
	          facebookId: profile.id,
	          avatar: profile.picture ? profile.picture.data.url : null
	        });
	      }

	      return user.save();
	    });
	  }).then(function (user) {
	    var payload = {
	      _id: user.id,
	      username: user.username,
	      avatar: user.avatar
	    };

	    var token = jwt.sign(payload, secret, { expiresIn: "24h" });

	    res.status(200).json({ token: token });
	  }).catch(function (err) {
	    console.log(err);
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  login: login
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);
	var bcrypt = __webpack_require__(14);

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
	  passwordHash: { type: String, required: true },
	  credit: { type: Number, default: 0 },
	  reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
	  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  createdAt: { type: Date, default: new Date() }
	});

	userSchema.pre("validate", function (next) {
	  if (!this._password && !this.githubId && !this.facebookId && !this.twitterId && !this.pinterestId && !this.instagramId) {
	    this.invalidate('password', 'A password is required');
	  }
	  next();
	});

	userSchema.virtual("password").set(function (password) {
	  this._password = password;
	  this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
	});

	userSchema.virtual("passwordConfirmation").get(function () {
	  return this._passwordConfirmation;
	}).set(function (passwordConfirmation) {
	  this._passwordConfirmation = passwordConfirmation;
	});

	userSchema.path("passwordHash").validate(function (passwordHash) {
	  if (this.isNew) {
	    if (!this._password) {
	      return this.invalidate("password", "A password is required");
	    }

	    if (this._password !== this._passwordConfirmation) {
	      return this.invalidate("passwordConfirmation", "Passwords do not match");
	    }
	  }
	});

	userSchema.methods.validatePassword = function (password) {
	  return bcrypt.compareSync(password, this.passwordHash);
	};

	module.exports = mongoose.model("User", userSchema);

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  secret: "Hje8*$ggH77@3E.42sd"
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var User = __webpack_require__(13);
	var request = __webpack_require__(15);
	var jwt = __webpack_require__(16);
	var secret = __webpack_require__(17).secret;
	var qs = __webpack_require__(19);

	function login(req, res) {
	  if (!req.body.oauth_token || !req.body.oauth_verifier) {

	    return request.post({
	      url: "https://api.twitter.com/oauth/request_token",
	      oauth: {
	        consumer_key: process.env.TWITTER_CONSUMER_KEY,
	        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	        callback: req.body.redirectUri
	      }
	    }).then(function (response) {
	      var token = qs.parse(response);
	      res.status(200).send(token);
	    }).catch(function (err) {
	      console.log(err);
	      res.status(500).json(err);
	    });
	  } else {
	    return request.post({
	      url: "https://api.twitter.com/oauth/access_token",
	      form: {
	        oauth_token: req.body.oauth_token,
	        oauth_verifier: req.body.oauth_verifier
	      }
	    }).then(function (token) {
	      var token = qs.parse(token);

	      return request.get({
	        url: "https://api.twitter.com/1.1/users/show.json",
	        qs: {
	          screen_name: token.screen_name
	        },
	        oauth: {
	          consumer_key: process.env.TWITTER_CONSUMER_KEY,
	          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	          oauth_token: token.oauth_token
	        },
	        json: true
	      });
	    }).then(function (profile) {
	      return User.findOne({ twitterId: profile.id }).then(function (user) {
	        if (user) {
	          user.twitterId = profile.id;
	          user.avatart = profile.profile_image_url;
	        } else {
	          user = new User({
	            username: profile.name,
	            twitterId: profile.id,
	            avatar: profile.profile_image_url
	          });
	        }
	        return user.save();
	      });
	    }).then(function (user) {
	      var payload = {
	        _id: user._id,
	        username: user.username,
	        avatar: user.avatar
	      };

	      var token = jwt.sign(payload, secret, { expiresIn: '24h' });

	      res.status(200).json({ token: token });
	    }).catch(function (err) {
	      res.status(500).json(err);
	    });
	  }
	}

	module.exports = {
	  login: login
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jwt = __webpack_require__(16);
	var User = __webpack_require__(13);
	var secret = __webpack_require__(17).secret;
	var email = __webpack_require__(21);
	var email = __webpack_require__(24);
	var schedule = __webpack_require__(22);

	function login(req, res) {
	  User.findOne({ email: req.body.email }, function (err, user) {
	    if (err) res.send(500).json(err);
	    if (!user || !user.validatePassword(req.body.password)) {
	      return res.status(401).json({ message: "Invalid credentials" });
	    }

	    var payload = { _id: user._id, username: user.username };
	    var token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });

	    return res.status(200).json({
	      message: "Login successful!",
	      token: token
	    });
	  });
	}

	function register(req, res) {
	  User.create(req.body, function (err, user) {
	    if (err) return res.status(400).json(err);

	    var payload = { _id: user._id, username: user.username };
	    var token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
	    var date = new Date();
	    var registrationEmail = EmailTemplate.findOne({ 'name': 'Registration' });
	    var newDate = date.setSeconds(date.getSeconds() + registrationEmail.delay);
	    email.sendRegisterTemplate(user);
	    var j = schedule.scheduleJob(newDate, function () {
	      console.log('This works? Hopefully');
	    });
	    return res.status(200).json({
	      message: "Thanks for registering!",
	      token: token
	    });
	  });
	}

	module.exports = {
	  login: login,
	  register: register
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Promise = __webpack_require__(5);
	var schedule = __webpack_require__(22);
	var nodemailer = __webpack_require__(23);
	var EmailTemplate = __webpack_require__(24);
	var smtpConfig = {
	  host: 'smtp.gmail.com',
	  port: 465,
	  secure: true,
	  auth: {
	    user: process.env.GMAIL_ID,
	    pass: process.env.GMAIL_PASSWORD
	  }
	};

	var registrationEmail = EmailTemplate.findOne({ 'name': 'Registration' });

	var registrationTransporter = nodemailer.createTransport(smtpConfig);

	var registerTemplate = registrationTransporter.templateSender({
	  subject: registrationEmail.subject,
	  text: registrationEmail.text,
	  html: registrationEmail.html
	}, { from: process.env.GMAIL_ID });
	function sendRegisterTemplate(user) {

	  email = user.email;
	  // Error handling
	  firstName_in = user.firstName;
	  if (firstName_in == undefined) {
	    firstName_in = "";
	  };
	  lastName_in = user.lastName;
	  if (lastName_in == undefined) {
	    lastName_in = "";
	  };
	  createdAt_in = user.createdAt;
	  if (createdAt_in == undefined) {
	    createdAt_in = "";
	  };

	  registerTemplate({
	    to: email
	  }, {
	    firstName: firstName_in,
	    lastName: lastName_in,
	    createdAt: createdAt_in
	  }, function (err, info) {
	    if (err) {
	      console.log('Error', err);
	    } else {
	      console.log('Yeah, email sent!');
	    }
	  });
	}

	module.exports = {
	  sendMail: function sendMail(mailOptions) {

	    return new Promise(function (resolve, reject) {

	      registrationTransporter.sendMail(mailOptions, function (err, info) {
	        if (err) return reject(err);
	        return resolve(info);
	      });
	    });
	  },
	  sendRegisterTemplate: sendRegisterTemplate
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("node-schedule");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);

	var emailTemplateSchema = new mongoose.Schema({
	  name: { type: String, required: true },
	  subject: { type: String, required: true },
	  text: { type: String, required: true },
	  html: { type: String, required: true },
	  delay: { type: Number, default: 0 }
	});

	module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var User = __webpack_require__(13);

	function userIndex(req, res) {
	  User.find().then(function (users) {
	    res.status(200).json(users);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function userShow(req, res) {
	  User.findById(req.params.id).then(function (user) {
	    res.status(200).json(user);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function userUpdate(req, res) {
	  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (user) {
	    res.status(200).json(user);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: userIndex,
	  show: userShow,
	  update: userUpdate
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Grouphug = __webpack_require__(27);

	function grouphugIndex(req, res) {
	  Grouphug.find().then(function (grouphugs) {
	    res.status(200).json(grouphugs);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugShow(req, res) {
	  Grouphug.findById(req.params.id).then(function (grouphug) {
	    res.status(200).json(grouphug);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugCreate(req, res) {
	  Grouphug.create(req.body).then(function (grouphug) {
	    res.status(201).json(grouphug);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugUpdate(req, res) {
	  Grouphug.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (grouphug) {
	    res.status(200).json(grouphug);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function grouphugDelete(req, res) {
	  Grouphug.findById(req.params.id).then(function (grouphug) {
	    return grouphug.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: grouphugIndex,
	  show: grouphugShow,
	  create: grouphugCreate,
	  update: grouphugUpdate,
	  delete: grouphugDelete
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);

	var grouphugSchema = new mongoose.Schema({
	  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  description: { type: String, required: true },
	  // creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	  // giftee: { type: mongoose.Schema.ObjectId, ref: "User" },
	  gifteeEmailAddress: { type: String }
	  // contributors: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	  // contributorEmailAdresses: [{ type: String }],
	  // contributionTotal: { type: Number, default: 0 },
	  // experiences: [{
	  //   experienceId: { type: mongoose.Schema.ObjectId, ref: "Experience" },
	  //   userWeightings: [{ user: { type: mongoose.Schema.ObjectId, ref: "User" },
	  //     weightValue: { type: Number, min: 1, max: 5 }, // between 1 and 5
	  //   }] 
	  // }],
	  // comments: [{
	  //   name: { type: String },
	  //   content: { type: String },
	  //   added: { type: Date }
	  // }]
	});

	module.exports = mongoose.model("Grouphug", grouphugSchema);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Experience = __webpack_require__(29);

	function experienceIndex(req, res) {
	  Experience.find().then(function (experiences) {
	    res.status(200).json(experiences);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function experienceShow(req, res) {
	  Experience.findById(req.params.id).then(function (experience) {
	    res.status(200).json(experience);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function experienceCreate(req, res) {
	  Experience.create(req.body).then(function (experience) {
	    res.status(201).json(experience);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function experienceUpdate(req, res) {
	  Experience.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (experience) {
	    res.status(200).json(experience);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function experienceDelete(req, res) {
	  Experience.findById(req.params.id).then(function (experience) {
	    return experience.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: experienceIndex,
	  show: experienceShow,
	  create: experienceCreate,
	  update: experienceUpdate,
	  delete: experienceDelete
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);

	var experienceSchema = new mongoose.Schema({
	  name: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  supplier: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  price: { type: Number, required: true },
	  tags: { type: [{
	      type: mongoose.Schema.ObjectId,
	      ref: "Tag" }],
	    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
	  }, //limited number of tags to 10
	  description: { type: String, required: true }
	});

	function arrayLimit(array) {
	  return array.length <= 10;
	}

	module.exports = mongoose.model("Experience", experienceSchema);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Review = __webpack_require__(31);

	function reviewIndex(req, res) {
	  Review.find().then(function (reviews) {
	    res.status(200).json(reviews);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewShow(req, res) {
	  Review.findById(req.params.id).then(function (review) {
	    res.status(200).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewCreate(req, res) {
	  Review.create(req.body).then(function (review) {
	    res.status(201).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewUpdate(req, res) {
	  Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (review) {
	    res.status(200).json(review);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function reviewDelete(req, res) {
	  Review.findById(req.params.id).then(function (review) {
	    return review.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: reviewIndex,
	  show: reviewShow,
	  create: reviewCreate,
	  update: reviewUpdate,
	  delete: reviewDelete
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);

	var reviewSchema = new mongoose.Schema({
	  title: { type: String, required: true, maxlength: 100 }, // limited length to 100
	  content: { type: String, required: true },
	  rating: { type: Number, required: true, min: 1, max: 5 }, // between 1 and 5
	  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	  experience: { type: mongoose.Schema.ObjectId, ref: "Experience", required: true },
	  added: { type: Date }
	});

	module.exports = mongoose.model("Review", reviewSchema);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Tag = __webpack_require__(33);

	function tagIndex(req, res) {
	  Tag.find().then(function (tags) {
	    res.status(200).json(tags);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagShow(req, res) {
	  Tag.findById(req.params.id).then(function (tag) {
	    res.status(200).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagCreate(req, res) {
	  Tag.create(req.body).then(function (tag) {
	    res.status(201).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagUpdate(req, res) {
	  Tag.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (tag) {
	    res.status(200).json(tag);
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	function tagDelete(req, res) {
	  Tag.findById(req.params.id).then(function (tag) {
	    return tag.remove();
	  }).then(function () {
	    res.status(204).end();
	  }).catch(function (err) {
	    res.status(500).json(err);
	  });
	}

	module.exports = {
	  index: tagIndex,
	  show: tagShow,
	  create: tagCreate,
	  update: tagUpdate,
	  delete: tagDelete
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(4);

	var tagSchema = new mongoose.Schema({
	  name: { type: String, required: true },
	  grouphugs: [{ type: mongoose.Schema.ObjectId, ref: "Grouphug" }],
	  experiences: [{ type: mongoose.Schema.ObjectId, ref: "Experience" }]
	});

	module.exports = mongoose.model("Tag", tagSchema);

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var config = {};

	config.mongoURI = {
	  development: 'mongodb://localhost/grouphug-testing',
	  test: 'mongodb://localhost/grouphug-test'
	};

	module.exports = config;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	var dbURIs = {
	  test: "mongodb://localhost/GroupHug-test",
	  development: "mongodb://localhost/GroupHug",
	  production: process.env.MONGODB_URI || "mongodb://localhost/GroupHug"
	};

	module.exports = function (env) {
	  return dbURIs[env];
	};

/***/ }
/******/ ]);