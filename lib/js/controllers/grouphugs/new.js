angular
  .module("GroupHugApp")
  .controller("GrouphugsNewController", GrouphugsNewController);

GrouphugsNewController.$inject = ["Grouphug", "$state", "$auth"]
function GrouphugsNewController(Grouphug, $state, $auth) {

  this.new = {};

  this.currentUser = $auth.getPayload();



  this.ages = ["0-12", "13-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91+"];

  this.genders = ["Female", "Male", "Gender-Neutral", "Prefer not to say"];

  this.occassions = ["Birthday", "Wedding", "Leaving", "Thank You", "Cheer Your Friend Up", "Retirement"];

  this.relations = ["Friend", "Partner", "Parent", "Grandparent", "Sibling", "Child"];

  this.contributorEmailAddresses = [];


  this.create = function() {
    this.new.creator = this.currentUser._id
    console.log("sends this.new:", this.new);
    Grouphug.save(this.new, function() {
      $state.go("grouphugsIndex");
    })
  }
}