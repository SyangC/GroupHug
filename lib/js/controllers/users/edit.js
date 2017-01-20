angular
  .module("GroupHugApp")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state", "$auth"];
function UsersEditController(User, $state, $auth) {
  var self = this;

  this.selected = User.get($state.params);
  console.log("current user", this.selected);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("usersShow", $state.params)
    })
  }
}