angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);

GrouphugsShowController.$inject = ["Grouphug", "$state"];
function GrouphugsShowController(Grouphug, $state) {
  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("grouphugsIndex");
    })
  }

  this.stripeCharge = function() {
    console.log("Before Stripe Token is created")
    var stripeToken = req.body.stripeToken;
    console.log(stripeToken)

    stripe.charges.create({
      card: stripeToken,
      currency: "usd",
      amount: 500
    },
    function(err, charge) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send("success");
      }
    });
  }
}