angular
  .module("GroupHugApp")
  .controller("GrouphugsIndexController", GrouphugsIndexController);

GrouphugsIndexController.$inject = ["Grouphug"];
function GrouphugsIndexController(Grouphug) {
  this.all = Grouphug.query();
}