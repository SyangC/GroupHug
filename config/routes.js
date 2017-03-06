var router = require("express").Router();

var facebookController = require("../controllers/facebookOauth");
var twitterController = require("../controllers/twitterOauth");
var authController = require("../controllers/auth");
var usersController = require("../controllers/users");
var grouphugsController = require("../controllers/grouphugs");
var ecardsController = require("../controllers/ecards");
var experiencesController = require("../controllers/experiences");
var thankyousController = require("../controllers/thankyous");
var reviewsController = require("../controllers/reviews");
var tagsController = require("../controllers/tags");
var chargeHandler = require("../controllers/chargeHandler");
var contributorHandler = require("../controllers/contributorHAndler");

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

router.route("")
  .get(grouphugsController.index);

router.route("/grouphugs")
  .all(secureRoute)
  .get(grouphugsController.index)
  .post(upload.array('pictures'),grouphugsController.create);

router.route("/grouphugs/:id")
  .all(secureRoute)
  .get(grouphugsController.show)
  .put(upload.array('pictures'),grouphugsController.update)
  .delete(grouphugsController.delete);

router.route("/charge")
  .post(chargeHandler.stripeCharge)

router.route("/contributor")
  .post(contributorHandler.contributorCreate)

router.route('/ecards')
  .get(ecardsController.index)
  .post(ecardsController.create);

router.route("/ecards/:id")
  .get(ecardsController.show)
  .put(ecardsController.update)
  .delete(ecardsController.delete);

router.route("/experiences")
  .get(experiencesController.index)
  .post(upload.array('pictures'),experiencesController.create);
router.route("/experiences/:id")
  .get(experiencesController.show)
  .put(upload.array('pictures'),experiencesController.update)
  .delete(experiencesController.delete);

router.route("/thankyous")
  .get(thankyousController.index);
  // .post(upload.array('pictures'),thankyousController.create);
router.route("/thankyous/:id")
  .get(thankyousController.show)
  .put(upload.array('pictures'),thankyousController.update)
  .delete(thankyousController.delete);

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

router.route("/users")
  .all(secureRoute)
  .get(usersController.index);


router.route("/users/:id")
  .all(secureRoute)
  .get(usersController.show)
  .put(usersController.update);

router.route("/edit/:id")
  .get(usersController.show)
  .put(usersController.update);





  



router.post("/oauth/facebook", facebookController.login);
router.post("/oauth/twitter", twitterController.login);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;