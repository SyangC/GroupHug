angular
  .module("GroupHugApp")
  .controller("GrouphugsEditController", GrouphugsEditController);

GrouphugsEditController.$inject = ["Grouphug", "$state"];
function GrouphugsEditController(Grouphug, $state) {

  this.selected = Grouphug.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("grouphugsShow", $state.params)
    })
  }
}