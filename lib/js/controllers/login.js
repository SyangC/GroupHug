angular
  .module("GroupHugApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$state", "$stateParams", "$rootScope"];
function LoginController($auth, $state, $stateParams, $rootScope) {

  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        console.log("Logging in ....");
        $rootScope.$broadcast("loggedIn");
      /*  $state.go("home");*/
      });
  }
/*
  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go("welcome");
    })
  }*/

  this.submit = function submit(){

    $auth.login(this.credentials, {
      url:"api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      this.currentUser = $auth.getPayload();
      console.log("USER IS>>>",this.currentUser)
      $state.go('usersWelcome',{id: this.currentUser._id});
      self.currentUser = $auth.getPayload();
  
    });
  };
}