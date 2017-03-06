var Grouphug = require('../models/grouphug');
var Contribution = require('../models/contribution');
var jwt = require("jsonwebtoken");
var secret = require("../config/tokens").secret;
var stripe_Api_Key = process.env.STRIPE_SECRET_KEY;
var stripe = require("stripe")(stripe_Api_Key);

function stripeCharge(req, res) {
  console.log("req.body.amount is:", req.body.amount);
  console.log("req.body is:", req.body);
  console.log("req.body.card.name is:", req.body.card.name); // name from stripe form
  // Get the credit card details submitted by the form
  var stripeToken = req.body.id; // Using Express
  var amount = req.body.amount;
  var grouphugId = req.body.grouphugId;
  var description = req.body.grouphugDescription;
 


  // Create a charge: this will charge the user's card
  var charge = stripe.charges.create({
    amount: amount,
    currency: "gbp",
    source: stripeToken,
    description: description,
  }, function(err, chargeInfo) {

    // console.log("chargeInfo: ", chargeInfo);
    // console.log("err: ", err);
    console.log("grouphugId: ", grouphugId);

    console.log("Contribution contents: ", {
        name: req.body.card.name,
        stripeToken: stripeToken,
        grouphug: grouphugId,
        amount: amount
      });

    if (!err) {
      Contribution.create({
        name: req.body.card.name,
        stripeToken: stripeToken,
        grouphug: grouphugId,
        amount: amount
      })
      .then(function(contribution) {
        console.log("contribution: ", contribution, contribution._id);
      })
      .catch(function(err) {
        console.log("err: ", err);
      }) 

      console.log("After contribution creation.");
      
      // The payment has been succesful
      
      return res.status(200).json({ message: "Payment successful" });
    }
    else{
      console.log("oooh payment went a bit wrong",err);
    }

    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      return res.status(400).json({ message: "Payment unsuccessful there was an error please contact Group Hug Admin" });
    }
  });
}



module.exports = {
  stripeCharge: stripeCharge
}