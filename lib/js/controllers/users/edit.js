angular
  .module("GroupHugApp")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state", "$auth"];
function UsersEditController(User, $state, $auth) {
  var self = this;

  this.selected = User.get($state.params);
  console.log("current user", this.selected);

  this.save = function() {
    console.log("self", this.selected);
    if(this.selected.isActivated){
      this.selected.$update(function() {
        $state.go("usersShow", $state.params)
      })
    }
    else {
      this.selected.$update(function() {
        $state.go("userActivated", $state.params)
      })
    }
  }
}