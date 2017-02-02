angular
  .module("GroupHugApp")
  .controller("ThankyousIndexController", ThankyousIndexController);

ThankyousIndexController.$inject = ["Thankyou"];
function ThankyousIndexController(Thankyou) {
  this.all = Thankyou.query();
}