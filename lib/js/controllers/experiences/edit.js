angular
  .module("GroupHugApp")
  .controller("ExperiencesEditController", ExperiencesEditController);

ExperiencesEditController.$inject = ["Experience", "$state"];
function ExperiencesEditController(Experience, $state) {

  this.selected = Experience.get($state.params);

  this.save = function() {
    this.selected.$update(function() {
      $state.go("experiencesShow", $state.params)
    })
  }
}