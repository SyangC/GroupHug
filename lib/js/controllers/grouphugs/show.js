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

  this.contributionAmount;
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
         console.log("user already in contributor list can't be added");
         this.newContributorEmail = null;
       }
        else {
          if(this.allUserEmails().indexOf(this.newContributorEmail) === -1){
            console.log("Adding a group hug user"); 
          };
          console.log("user is ok to add");
          console.log(this.allUsers);
          console.log("adding ",this.newContributorEmail, "to the list", this.selected.contributorEmailAddresses,"for ",this.selected.gifteeFirstName,"length",this.selected.contributorEmailAddresses.length);
          this.selected.contributorEmailAddresses.push(this.newContributorEmail);
          this.selected.$update();
          this.newContributorEmail = null;
      }
    };
  }

  this.newContributor = function(){
   
    

    if(this.newContributorEmail){
      console.log("New Contributor",this.newContributorEmail," name: ",this.newContributorName,  this.selected._id,this.selected.name);
      var contributor_email = this.newContributorEmail;
      var contributor_name = this.newContributorName;
      var grouphug_Id = this.selected._id;
      this.newContributorEmail = ""; 
      this.newContributorName = "";

      var contributorHandler = JSON.stringify({
          grouphug_Id:grouphug_Id,
          email:contributor_email,
          name:contributor_name});
        $http.post("api/contributor", contributorHandler).
          success(function(data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              console.log("contributor handler",data);
          }).
          error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    };

    //add some code to warn if only email given or if submit and no email address.
      
    
  }

  this.checkout = function(grouphugName) {
    self.chargeAmount = Math.round(parseFloat(this.contributionAmount)*100);
   
    this.contributionAmount = "";
    var handler = StripeCheckout.configure({
      key: "pk_test_eeEvZQY5GGkEmboxgG7RsiWa",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: function(token) {
        console.log("<<<docfor contribution process",grouphugName);
        token.amount = self.chargeAmount;
        token.grouphugId = $state.params.id;
        token.grouphugDescription = grouphugName;

        $http.post("/api/charge", token)
          .success(function (token, status, headers) {
            console.log("success: ");
            console.log("token: ", token);
            console.log("status: ", status);
            console.log("headers: ", headers);
          })
          .error(function (token, status, header) {
            console.log("failure: ");
            console.log("token: ", token);
            console.log("status: ", status);
            console.log("headers: ", headers);

          });
      }
    });



    handler.open({
      name: "GroupHug",
      description: "Please enter your payment details below",
      zipCode: true,
      currency: "gbp",
      amount: self.chargeAmount,
      billingAddress: true
    });
    
    window.addEventListener("popstate", function() {
      handler.close();
    });

  }

  this.makelive = function(){
    window.alert("live");
    this.selected.madelive = "true";
    console.log("self is this before ", this.selected.madelive);
    this.selected.$update();
    console.log("self is this after", self.selected);
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