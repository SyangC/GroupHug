angular
  .module("GroupHugApp")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state"];
function UsersEditController(User, $state) {
  var self = this;

  this.selected = User.get($state.params);
  console.log("current user", this.selected);

  this.selected.$update(function(){
    console.log("updating", this.selected);
    $state.go('usersShow', $state.params);
  });

  // this.update = function() {
  //   this.selected.$update();
  // }
}