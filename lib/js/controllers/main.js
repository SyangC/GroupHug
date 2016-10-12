angular
  .module("Londate")
  .controller("MainController", MainController);

MainController.$inject = ["$state", "$auth", "$rootScope", "User"];
function MainController($state, $auth, $rootScope, User) {
  var self = this;

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
         .then(function() {
      $rootScope.$broadcast("loggedIn");
      $state.go('events');
    });
  }

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

}