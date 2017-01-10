angular
  .module("GroupHugApp")
  .controller("ThankyousShowController", ThankyousShowController);

ThankyousShowController.$inject = ["Thankyou", "$state"];
function ThankyousShowController(Thankyou, $state) {
  this.selected = Thankyou.get($state.params)

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("thankyousIndex");
    })
  }
}