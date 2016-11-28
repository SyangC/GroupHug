angular
  .module("GroupHugApp")
  .controller("ExperiencesShowController", ExperiencesShowController);

ExperiencesShowController.$inject = ["Experience", "$state"];
function ExperiencesShowController(Experience, $state) {
  this.selected = Experience.get($state.params)

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("experiencesIndex");
    })
  }
}