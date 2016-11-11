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
        $state.go("events");
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