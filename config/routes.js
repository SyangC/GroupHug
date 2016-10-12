var router = require("express").Router();

var facebookController = require("../controllers/facebookOauth");
var twitterController = require("../controllers/instagramOauth");
var authController = require("../controllers/auth");
var usersController = require("../controllers/users");
var grouphugsController = require("../controllers/grouphugs");
var experiencesController = require("../controllers/expriences");

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

router.route('/grouphugs')
  .get(grouphugsController.index)
  .post(grouphugsController.create);
router.route("/grouphugs/:id")
  .get(grouphugsController.show)
  .put(grouphugsController.update)
  .delete(grouphugsController.delete);

router.route('/experiences')
  .get(experiencesController.index)
  .post(experiencesController.create);
router.route("/experiences/:id")
  .get(experiencesController.show)
  .put(experiencesController.update)
  .delete(experiencesController.delete);

router.get("/users", usersController.index)
router.route("/users/:id")
  .get(usersController.show)
  .put(usersController.update)

router.post("/oauth/facebook", facebookController.login);
router.post("/oauth/twitter", twitterController.login);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;