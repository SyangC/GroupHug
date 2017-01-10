angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);




GrouphugsShowController.$inject = ["User", "Grouphug", "$state", "$scope", "$auth", "$http"];
function GrouphugsShowController(User, Grouphug, $state, $scope, $auth, $http) {

  var self = this

  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("grouphugsIndex");
    })
  }

  this.allUsers = User.query();

  this.allUserEmails = function(){
    var tempUserEmails =[];
    for (i=0; i < this.allUsers.length; i++){
      tempUserEmails.push(this.allUsers[i].email);
    }
    console.log('User Emails', tempUserEmails);
    return tempUserEmails
  }

  this.newContributorEmail = null

  this.addContributor = function(){
    console.log(this.selected.gifteeFirstName);
    console.log(this.selected.contributorEmailAddresses);
    
    if(this.newContributorEmail){
      if(this.selected.contributorEmailAddresses.indexOf(this.newContributorEmail) > -1 ){
         window.alert("already exists can't be added");
         this.newContributorEmail = null;
       }
        else {
          if(this.allUserEmails().indexOf(this.newContributorEmail) === -1){
            console.log("Adding a group hug user"); 
          };
          window.alert("ok");
          console.log(this.allUsers);
          console.log("adding ",this.newContributorEmail, "to the list", this.selected.contributorEmailAddresses,"for ",this.selected.gifteeFirstName,"length",this.selected.contributorEmailAddresses.length);
          this.selected.contributorEmailAddresses.push(this.newContributorEmail);
          this.selected.$update();
          this.newContributorEmail = null;
      }
    };
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

  this.averageWeight = function(experience) {
    var weightTotal = 0;
    var weightCount = 0;
    experience.userWeightings.forEach(function(userWeighting) {
      weightTotal += userWeighting.weightValue;
      weightCount++;
    })
    if (weightCount === 0) return "No Ratings";
    return weightTotal/weightCount;
  }

  this.canVote = function(experience, user) {
    if (experience.userWeightings.filter(function(weighting) { return weighting.user == user }).length > 0 || !user) {
      return false;
    } else {
      return true;
    }
  }

  this.saveWeightings = function() {
    var weightCount = 0;
    var userId = $auth.getPayload();
    this.selected.experiences.forEach(function(experience) {
      if (!!experience.newWeighting) {
        experience.userWeightings.push({
          user: userId,
          weightValue: +experience.newWeighting
        })
        weightCount++;
      }
    })

    if (weightCount > 0) {
      this.selected.$update(function() {
        $state.reload();
      })
    }
  }


  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      window.alert('success! token: ' + result.id);
    }
  };
}