angular
  .module("GroupHugApp")
  .controller("UsersWelcomeController", UsersWelcomeController);

UsersWelcomeController.$inject = ["User", "$state", "$auth"];
function UsersWelcomeController(User, $state, $auth) {


  this.selected = User.get($state.params);

 

}