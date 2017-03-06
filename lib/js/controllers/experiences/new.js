angular
  .module("GroupHugApp")
  .controller("ExperiencesNewController", ExperiencesNewController);

ExperiencesNewController.$inject = ["Experience", "$state"]
function ExperiencesNewController(Experience, $state) {

  this.new = {};

  this.create = function() {
    Experience.save(this.new, function() {
      $state.go("experiencesIndex");
    })
  }
}