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

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var jwt = require("jsonwebtoken");
var secret = require("./tokens").secret;

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;
    next();
  });
}

router.route('/')
  .get(grouphugsController.index);

router.route('/grouphugs')
  .get(grouphugsController.index)
  .post(grouphugsController.create);

router.route("/grouphugs/:id")
  .get(grouphugsController.show)
  .put(grouphugsController.update)
  .delete(grouphugsController.delete);

router.route('/ecards')
  .get(ecardsController.index)
  .post(ecardsController.create);

router.route("/ecards/:id")
  .get(ecardsController.show)
  .put(ecardsController.update)
  .delete(ecardsController.delete);

router.post('/charge', function(req, res,next) {
  var stripeToken = req.body.stripeToken;
  console.log(stripeToken)

  stripe.charges.create({
    card: stripeToken,
    currency: "GBP",
    amount: 500
  },
  function(err, charge) {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
    }
  });
});

router.route('/experiences')
  .get(experiencesController.index)
  .post(experiencesController.create);
router.route("/experiences/:id")
  .get(experiencesController.show)
  .put(experiencesController.update)
  .delete(experiencesController.delete);

router.route('/reviews')
  .get(reviewsController.index)
  .post(reviewsController.create);
router.route("/reviews/:id")
  .get(reviewsController.show)
  .put(reviewsController.update)
  .delete(reviewsController.delete);

router.route('/tags')
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

router.post('/charge', function(req, res,next) {
  var stripeToken = req.body.stripeToken;
  var amount = 5 * 100;

  stripe.charges.create({
    card: stripeToken,
    currency: 'usd',
    amount: amount
  },
  function(err, charge) {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
    }
  });
});

module.exports = router;