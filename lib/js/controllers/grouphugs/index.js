angular
  .module("GroupHugApp")
  .controller("GrouphugsIndexController", GrouphugsIndexController);

GrouphugsIndexController.$inject = ["Grouphug", "$auth"];
function GrouphugsIndexController(Grouphug, $auth) {
  this.all = Grouphug.query();
  this.message = null;
  this.currentUser = $auth.getPayload()._id
}

