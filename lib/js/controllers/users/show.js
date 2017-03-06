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