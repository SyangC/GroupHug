angular
  .module("GroupHugApp")
  .controller("UsersShowController", UsersShowController);

UsersShowController.$inject = ["User", "$state", "$auth"];
function UsersShowController(User, $state, $auth) {


  this.selected = $auth.getPayload();


  this.update = function() {
    this.selected.$update();
  }
}