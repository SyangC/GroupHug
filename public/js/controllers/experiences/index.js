angular
  .module("GroupHugApp")
  .controller("ExperiencesIndexController", ExperiencesIndexController);

ExperiencesIndexController.$inject = ["Experience"];
function ExperiencesIndexController(Experience) {
  this.all = Experience.query();
}