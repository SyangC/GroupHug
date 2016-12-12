angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);

GrouphugsShowController.$inject = ["Grouphug", "$state", "$http"];
function GrouphugsShowController(Grouphug, $state, $http) {

  var self = this

  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("grouphugsIndex");
    })
  }

  this.contributionAmount

  this.checkout = function() {
    self.contributionAmount = document.getElementById("userInput").value * 100
    var handler = StripeCheckout.configure({
      key: "pk_test_cQJL918XjF2uKwmmkgnSBeBr",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: function(token) {

        token.amount = self.contributionAmount

        $http.post("/api/charge", token)
          .success(function (token, status, headers) {
          })
          .error(function (token, status, header) {

          });
      }
    });

    handler.open({
      name: "GroupHug",
      description: "Please enter your payment details below",
      zipCode: true,
      currency: "gbp",
      amount: self.contributionAmount,
      billingAddress: true
    });
    
    window.addEventListener("popstate", function() {
      handler.close();
    });
  }
}