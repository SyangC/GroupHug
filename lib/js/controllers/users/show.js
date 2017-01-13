angular
  .module("GroupHugApp")
  .controller("UsersShowController", UsersShowController);

UsersShowController.$inject = ["User", "$state", "$auth"];
function UsersShowController(User, $state, $auth) {
  var self = this;

  this.editable = false

  this.selected = $auth.getPayload();

  console.log("this selected =", this.selected)

  if (this.selected.isActivated == false)
      {console.log("Not active",this.currentUser)}
    else{console.log("active",this.currentUser)};



 

  $state.params.id === this.currentUser? this.editable = false : this.editable = true;

  console.log($state.params.id, this.currentUser, this.editable);

  console.log ("state params", $state.params);
/*
  this.update = function() {
    this.selected.$update();
  } should be on edit page?*/
}