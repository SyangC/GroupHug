angular
  .module("GroupHugApp")
  .controller("GrouphugsNewController", GrouphugsNewController);

GrouphugsNewController.$inject = ["Grouphug", "$state"]
function GrouphugsNewController(Grouphug, $state) {

  this.new = {};

  this.ages = ["0-12", "13-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91+"];

  this.occasions = ["Birthday", "Wedding", "Leaving", "Thank You", "Cheer Your Friend Up", "Retirement"];

  this.relations = ["Friend", "Partner", "Parent", "Grandparent", "Subling", "Child"];

  this.create = function() {
    console.log("grouphugs.new sent data", this.new);
    Grouphug.save(this.new, function() {
      // console.log("response", res);
      $state.go("grouphugsIndex");
    })
  }
}