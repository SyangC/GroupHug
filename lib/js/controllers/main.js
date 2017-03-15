angular
  .module("GroupHugApp")
  .controller("MainController", MainController);

MainController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http", "$window", "TokenService"];
function MainController(User, Grouphug, Experience, $state, $auth, $rootScope, $http, $window, TokenService) {
  var self = this;

  this.allUsers = User.query();

  this.allGrouphugs = Grouphug.query();

  this.allExperiences = Experience.query();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
       /* $state.go("welcome");*/
      });
  }

  this.currentUser = $auth.getPayload();

  this.errorMessage = null;

  this.logout = function logout() {
    $auth.removeToken();
    $window.localStorage.removeItem('token');
    console.log("logging out");
    this.currentUser = null;
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
    console.log("wey logged in");
  });

  $rootScope.$on("unauthorized", function() {
    console.log("Getting unauthorized");
    $state.go("login");
    self.errorMessage = "You are not authorized to view this content, please log in.";
  });


  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });

  $rootScope.$state = $state;

}