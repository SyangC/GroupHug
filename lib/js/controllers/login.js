angular
  .module("GroupHugApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$state", "$rootScope"];
function LoginController($auth, $state, $rootScope) {

  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        console.log("Logging in ....");
        $rootScope.$broadcast("loggedIn");
        $state.go("home");
      });
  }

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
      $rootScope.$broadcast("vloggedIn");
      $state.go("home");
    })
  }
}