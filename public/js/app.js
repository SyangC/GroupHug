angular
  .module("GroupHugApp", ["ngResource", "ui.router", "satellizer", "angularPayments"])
  .config(oAuthConfig)
  .config(Router)
  .config(function() {
    Stripe.setPublishableKey("pk_test_eeEvZQY5GGkEmboxgG7RsiWa");
  })

oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  // $authProvider.twitter({
  //   url: "/api/oauth/twitter",
  //   clientId: //no idea. Need to look into this later, as I did not do twitter for my project.
  // })
  $authProvider.facebook({
    url: "/api/oauth/facebook",
    clientId: "1115097508582543"
  })
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html",
      controller: "MainController as main"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("adminUi", {
      url: "/adminUi",
      templateUrl: "/templates/adminUi.html",
      controller: "AdminUiController as admin"
    })
    .state("adminUiGrouphugShow", {
      url: "/adminUi/grouphugs/:id",
      templateUrl: "/templates/admin/show.html",
      controller: "adminUiGrouphugShowController as grouphugsShow"
    })
    .state("experiencesIndex", {
      url: "/experiences",
      templateUrl: "/templates/experiences/index.html",
      controller: "ExperiencesIndexController as experiencesIndex"
    })
    .state("experiencesNew", {
      url: "/experiences/new",
      templateUrl: "/templates/experiences/new.html",
      controller: "ExperiencesNewController as experiencesNew"
    })
    .state("experiencesShow", {
      url: "/experiences/:id",
      templateUrl: "/templates/experiences/show.html",
      controller: "ExperiencesShowController as experiencesShow"
    })
    .state("experiencesEdit", {
      url: "/experiences/:id/edit",
      templateUrl: "/templates/experiences/edit.html",
      controller: "ExperiencesEditController as experiencesEdit"
    })
    .state("thankyousIndex", {
      url: "/thankyous",
      templateUrl: "/templates/thankyous/index.html",
      controller: "ThankyousIndexController as thankyousIndex"
    })
    .state("thankyousShow", {
      url: "/thankyous/:id",
      templateUrl: "/templates/thankyous/show.html",
      controller: "ThankyousShowController as thankyousShow"
    })
    .state("thankyousEdit", {
      url: "/thankyous/:id/edit",
      templateUrl: "/templates/thankyous/edit.html",
      controller: "ThankyousEditController as thankyousEdit"
    })
    .state("grouphugsIndex", {
      url: "/grouphugs",
      templateUrl: "/templates/grouphugs/index.html",
      controller: "GrouphugsIndexController as grouphugsIndex"
    })
    .state("grouphugsNew", {
      url: "/grouphugs/new",
      templateUrl: "/templates/grouphugs/new.html",
      controller: "GrouphugsNewController as grouphugsNew"
    })
    .state("grouphugsShow", {
      url: "/grouphugs/:id",
      templateUrl: "/templates/grouphugs/show.html",
      controller: "GrouphugsShowController as grouphugsShow"
    })
    .state("grouphugsEdit", {
      url: "/grouphugs/:id/edit",
      templateUrl: "/templates/grouphugs/edit.html",
      controller: "GrouphugsEditController as grouphugsEdit"
    })
    .state("usersIndex", {
      url: "/users",
      templateUrl: "/templates/users/index.html",
      controller: "UsersIndexController as usersIndex"
    })
    .state("usersShow", {
      url: "/users/:id",
      templateUrl: "/templates/users/show.html",
      controller: "UsersShowController as usersShow"
    })
    .state("usersEdit", {
      url: "/edit/:id",
      templateUrl: "/templates/users/edit.html",
      controller: "UsersEditController as usersEdit"
    })
    .state("userActivated",{
      url: "/activated",
      templateUrl: "/templates/users/activated.html",
      controller: "UsersEditController as usersEdit"
    })



    $urlRouterProvider.otherwise("/");
}
angular
  .module("GroupHugApp")
angular
  .module("GroupHugApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$state", "$rootScope"];
function LoginController($auth, $state, $rootScope) {

  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");
      });
  }

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go("home");
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("MainController", MainController);

MainController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http"];
function MainController(User, Grouphug, Experience, $state, $auth, $rootScope, $http) {
  var self = this;

  this.allUsers = User.query();

  this.allGrouphugs = Grouphug.query();

  this.allExperiences = Experience.query();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");
      });
  }

  this.currentUser = $auth.getPayload();

  this.errorMessage = null;

  this.logout = function logout() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You are not authorized to view this content, please log in.";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });

  $rootScope.$state = $state;

}
angular
  .module("GroupHugApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["$auth", "$state", "$rootScope"];
function RegisterController($auth, $state, $rootScope) {

  self = this;

  self.user = {};

  self.submit = function() {
    $auth.signup(self.user, {
      url: '/api/register'
    })
    .then(function(){
      console.log(self.user);
      $rootScope.$broadcast("loggedIn");
      $state.go("home");
    })
  }
}
angular
  .module('GroupHugApp')
  .directive('date', date);

function date() {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      ngModel.$formatters.push(function(value) {
        return new Date(value);
      });
    }
  }
}
angular
  .module('GroupHugApp')
  .directive('file', file);

function file() {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      element.on('change', function(e) {
        if(element.prop('multiple')) {
          ngModel.$setViewValue(e.target.files);
        } else {
          ngModel.$setViewValue(e.target.files[0]);
        }
      });
    }
  }
}
// angular
//   .module("GroupHugApp")
//   .factory("Experience", Experience);

// Experience.$inject = ["$resource"]
// function Experience($resource) {
//   return $resource('/api/experiences/:id', { id: '@_id' }, {
//     update: { method: "PUT" }
//   });
// }

angular
  .module("GroupHugApp")
  .factory("Experience", Experience);

Experience.$inject = ["$resource", "formData"]
function Experience($resource, formData) {
  return $resource('/api/experiences/:id', { id: '@_id' }, {
    update: {
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    save: {
      method: "POST",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    }
  });
}
angular
  .module("GroupHugApp")
  .factory("Grouphug", Grouphug);

Grouphug.$inject = ["$resource", "formData"]
function Grouphug($resource, formData) {
  return $resource('/api/grouphugs/:id', { id: '@_id' }, {
    update: {
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    save: {
      method: "POST",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    }
  });
}
// angular
//   .module("GroupHugApp")
//   .factory("Experience", Experience);

// Experience.$inject = ["$resource"]
// function Experience($resource) {
//   return $resource('/api/experiences/:id', { id: '@_id' }, {
//     update: { method: "PUT" }
//   });
// }

angular
  .module("GroupHugApp")
  .factory("Thankyou", Thankyou);

Thankyou.$inject = ["$resource", "formData"]
function Thankyou($resource, formData) {
  return $resource('/api/thankyous/:id', { id: '@_id' }, {
    update: {
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    save: {
      method: "POST",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    }
  });
}
angular
  .module("GroupHugApp")
  .factory("User", User);

User.$inject = ["$resource"]
function User($resource) {
  return $resource('/api/users/:id', { id: '@_id' }, {
    update: { method: "PUT" }
  });
}
angular
  .module('GroupHugApp')
  .factory('formData', formData);

function formData() {
  return {
    transform: function(data) {
      var formData = new FormData();
      angular.forEach(data, function(value, key) {
        if(!!value && value._id) value = value._id;
        if(!key.match(/^\$/)) {

          if(value instanceof FileList) {
            for(i=0;i<value.length;i++) {
              formData.append(key, value[i]);
            }
          } else if(key === "experiences") {
            formData.append(key, angular.toJson(value, false));
          } else {
            formData.append(key, value);
          }
        }
      });
      return formData;
    }
  }
}
angular
  .module("GroupHugApp")
  .controller("adminUiGrouphugShowController", adminUiGrouphugShowController);

  adminUiGrouphugShowController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http"];
function adminUiGrouphugShowController(User, Grouphug, Experience, $state, $auth, $rootScope, $http) {
  var self = this;

  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.ages = ["0-12", "13-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91+"];

  this.statusOptions = ["inactive", "active"];

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

  this.addExperience = function(experience) {
    this.selected.experiences.push({
      experienceId: experience
    })
    console.log("Adding experience", this.selected.experiences);
  }

  this.removeExperience = function(experience) {
    this.selected.experiences.splice(
      this.selected.experiences.indexOf(experience), 1);
  }

  this.toggleActivateGrouphug = function() {
    console.log("trying to make GH Active...");
    if(this.selected.status === "inactive") {
      this.selected.status = "active";
    } else {
      console.log("making GH inactive")
      this.selected.status = "inactive";
    }
  }

  this.allExperiences = Experience.query();

  this.currentUser = $auth.getPayload();

  this.saveChanges = function() {
    this.selected.$update(function() {
      $state.reload();
    })
  }

}
angular
  .module("GroupHugApp")
  .controller("AdminUiController", AdminUiController);

AdminUiController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http"];
function AdminUiController(User, Grouphug, Experience, $state, $auth, $rootScope, $http) {
  var self = this;

  this.allUsers = User.query();

  this.allGrouphugs = Grouphug.query();

  this.allExperiences = Experience.query();

  this.currentUser = $auth.getPayload();

}
angular
  .module("GroupHugApp")
  .controller("ExperiencesEditController", ExperiencesEditController);

ExperiencesEditController.$inject = ["Experience", "$state"];
function ExperiencesEditController(Experience, $state) {

  this.selected = Experience.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("experiencesShow", $state.params)
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("ExperiencesIndexController", ExperiencesIndexController);

ExperiencesIndexController.$inject = ["Experience", "$state"];
function ExperiencesIndexController(Experience) {
  this.all = Experience.query();
  console.log("experiences All", this.all);
}
angular
  .module("GroupHugApp")
  .controller("ExperiencesNewController", ExperiencesNewController);

ExperiencesNewController.$inject = ["Experience", "$state"]
function ExperiencesNewController(Experience, $state) {

  this.new = {};

  this.create = function() {
    Experience.save(this.new, function() {
      $state.go("experiencesIndex");
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("ExperiencesShowController", ExperiencesShowController);

ExperiencesShowController.$inject = ["Experience", "$state"];
function ExperiencesShowController(Experience, $state) {
  this.selected = Experience.get($state.params)

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("experiencesIndex");
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("GrouphugsEditController", GrouphugsEditController);

GrouphugsEditController.$inject = ["Grouphug", "$state"];
function GrouphugsEditController(Grouphug, $state) {

  this.selected = Grouphug.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("grouphugsShow", $state.params)
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("GrouphugsIndexController", GrouphugsIndexController);

GrouphugsIndexController.$inject = ["Grouphug"];
function GrouphugsIndexController(Grouphug) {
  this.all = Grouphug.query();
}


angular
  .module("GroupHugApp")
  .controller("GrouphugsNewController", GrouphugsNewController);

GrouphugsNewController.$inject = ["Grouphug", "$state", "$auth"]
function GrouphugsNewController(Grouphug, $state, $auth) {

  this.new = {};

  this.currentUser = $auth.getPayload();



  this.ages = ["0-12", "13-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91+"];

  this.genders = ["Female", "Male", "Gender-Neutral", "Prefer not to say"];

  this.occassions = ["Birthday", "Wedding", "Leaving", "Thank You", "Cheer Your Friend Up", "Retirement"];

  this.relations = ["Friend", "Partner", "Parent", "Grandparent", "Sibling", "Child"];

  this.contributorEmailAddresses = [];


  this.create = function() {
    this.new.creator = this.currentUser._id
    console.log("sends this.new:", this.new);
    Grouphug.save(this.new, function() {
      $state.go("grouphugsIndex");
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);




GrouphugsShowController.$inject = ["User", "Grouphug", "$state", "$scope", "$auth", "$http", "$timeout"];
function GrouphugsShowController(User, Grouphug, $state, $scope, $auth, $http, $timeout) {

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
              console.log("contributor handler sucess",data);
              $timeout(function () {
                    $state.go('.', {}, { reload: true });
                    }, 100);    
          }).
          error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              console.log("contributor handler failed",data);
              $state.reload();
          });
    };

    //add some code to warn if only email given or if submit and no email address.
      
    
  }

  this.checkout = function(grouphugName) {
    self.chargeAmount = Math.round(parseFloat(this.contributionAmount)*100);
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
            console.log("payment complete");
            $timeout(function () {
                  $state.go('.', {}, { reload: true });
                  }, 100);  
            this.contributionAmount = "";  
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
angular
  .module("GroupHugApp")
  .controller("ThankyousEditController", ThankyousEditController);

ThankyousEditController.$inject = ["Thankyou", "$state"];
function ThankyousEditController(Thankyou, $state) {

  this.selected = Thankyou.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("thankyousShow", $state.params)
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("ThankyousIndexController", ThankyousIndexController);

ThankyousIndexController.$inject = ["Thankyou"];
function ThankyousIndexController(Thankyou) {
  this.all = Thankyou.query();
}
angular
  .module("GroupHugApp")
  .controller("ThankyousShowController", ThankyousShowController);

ThankyousShowController.$inject = ["Thankyou", "$state"];
function ThankyousShowController(Thankyou, $state) {
  this.selected = Thankyou.get($state.params)

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("thankyousIndex");
    })
  }
}
angular
  .module("GroupHugApp")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state", "$auth"];
function UsersEditController(User, $state, $auth) {
  var self = this;

  this.selected = User.get($state.params);
  console.log("current user", this.selected);

  this.save = function() {
    console.log("self", this.selected);
    if(this.selected.isActivated){
      this.selected.$update(function() {
        $state.go("usersShow", $state.params)
      })
    }
    else {
      this.selected.$update(function() {
        $state.go("userActivated", $state.params)
      })
    }
  }
}
angular
  .module("GroupHugApp")
  .controller("UsersIndexController", UsersIndexController);

UsersIndexController.$inject = ["User", "$state", "$window", "$rootScope"];
function UsersIndexController(User, $state, $window, $rootScope) {

  this.all = User.query();

}
angular
  .module("GroupHugApp")
  .controller("UsersShowController", UsersShowController);

UsersShowController.$inject = ["User", "$state", "$auth"];
function UsersShowController(User, $state, $auth) {

/* this method was not updating show page after edit 
  this.selected = $auth.getPayload();*/

  this.selected = User.get($state.params);


  this.update = function() {
    this.selected.$update();
  }
}