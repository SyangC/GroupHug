angular
  .module("GroupHugApp")
  .controller("GrouphugsNewController", GrouphugsNewController);

GrouphugsNewController.$inject = ["Grouphug", "$state"]
function GrouphugsNewController(Grouphug, $state) {

  this.new = {};

  this.create = function() {
    Grouphug.save(this.new, function() {
      $state.go("grouphugsIndex");
    })
  }
}