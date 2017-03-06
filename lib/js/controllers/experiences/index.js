angular
  .module("GroupHugApp")
  .controller("ExperiencesIndexController", ExperiencesIndexController);

ExperiencesIndexController.$inject = ["Experience", "$state"];
function ExperiencesIndexController(Experience) {
  this.all = Experience.query();
  console.log("experiences All", this.all);
}