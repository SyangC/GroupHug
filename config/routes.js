var router = require("express").Router();

var facebookController = require("../controllers/facebookOauth");
var twitterController = require("../controllers/twitterOauth");
var authController = require("../controllers/auth");
var usersController = require("../controllers/users");
var grouphugsController = require("../controllers/grouphugs");
var ecardsController = require("../controllers/ecards");
var experiencesController = require("../controllers/experiences");
var reviewsController = require("../controllers/reviews");
var tagsController = require("../controllers/tags");

var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var jwt = require("jsonwebtoken");
var secret = require("./tokens").secret;

var upload = require('./upload');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;
    next();
  });
}

function stripeCharge(req, res, next) {

  console.log("req.body.id is:", req.body.id)
  console.log("req.body.amount is:", req.body.amount)
  // Get the credit card details submitted by the form
  var token = req.body.id; // Using Express
  var amount = req.body.amount

  // Create a charge: this will charge the user's card
  var charge = stripe.charges.create({
    amount: amount,
    currency: "gbp",
    source: token,
    description: "GroupHug Contribution"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
}

router.route("/")
  .get(grouphugsController.index);

router.route("/grouphugs")
  .get(grouphugsController.index)
  .post(upload.array('pictures'),grouphugsController.create);

router.route("/grouphugs/:id")
  .get(grouphugsController.show)
  .put(upload.array('pictures'),grouphugsController.update)
  .delete(grouphugsController.delete);

router.route("/charge")
  .post(stripeCharge)

router.route('/ecards')
  .get(ecardsController.index)
  .post(ecardsController.create);

router.route("/ecards/:id")
  .get(ecardsController.show)
  .put(ecardsController.update)
  .delete(ecardsController.delete);

router.route("/experiences")
  .get(experiencesController.index)
  .post(experiencesController.create);
router.route("/experiences/:id")
  .get(experiencesController.show)
  .put(experiencesController.update)
  .delete(experiencesController.delete);

router.route("/reviews")
  .get(reviewsController.index)
  .post(reviewsController.create);
router.route("/reviews/:id")
  .get(reviewsController.show)
  .put(reviewsController.update)
  .delete(reviewsController.delete);

router.route("/tags")
  .get(tagsController.index)
  .post(tagsController.create);
router.route("/tags/:id")
  .get(tagsController.show)
  .put(tagsController.update)
  .delete(tagsController.delete);

router.get("/users", usersController.index)
router.route("/users/:id")
  .get(usersController.show)
  .put(usersController.update)

router.post("/oauth/facebook", facebookController.login);
router.post("/oauth/twitter", twitterController.login);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;