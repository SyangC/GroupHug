angular
  .module("GroupHugApp")
  .controller("ThankyousEditController", ThankyousEditController);

ThankyousEditController.$inject = ["Thankyou", "$state"];
function ThankyousEditController(Thankyou, $state) {

  this.selected = Thankyou.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("thankyousShow", $state.params)
    })
  }
}