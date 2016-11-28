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