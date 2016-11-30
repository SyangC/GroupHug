angular
  .module("GroupHugApp")
  .controller("adminUiGrouphugShowController", adminUiGrouphugShowController);

  adminUiGrouphugShowController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http"];
function adminUiGrouphugShowController(User, Grouphug, Experience, $state, $auth, $rootScope, $http) {
  var self = this;

  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.addExperience = function(experience) {
    console.log("experience is: ", experience);
    console.log("self.selected.experiences before: ", self.selected.experiences);
    this.selected.experiences.push({
      experienceId: experience
    })
    console.log("self.selected.experiences after: ", self.selected.experiences);
  }

  // function isBigEnough(element) {
  //   return element >= 15;
  // }

  // [12, 5, 8, 130, 44].findIndex(isBigEnough); // 3

  // this.removeGenre = function(genre) {
  //   this.selectedGenres.splice(
  //     this.selectedGenres.indexOf(genre), 1);
  // }

  this.removeExperience = function(experience) {
    this.selected.experiences.splice(
      this.selected.experiences.indexOf(experience), 1);
  }

  this.allExperiences = Experience.query();

  this.currentUser = $auth.getPayload();

}