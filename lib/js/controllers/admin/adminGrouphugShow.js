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
    this.selected.experiences.push({
      experienceId: experience
    })
  }

  this.removeExperience = function(experience) {
    this.selected.experiences.splice(
      this.selected.experiences.indexOf(experience), 1);
  }

  this.allExperiences = Experience.query(function(experiences) {
      console.log(experiences);
    });

  this.currentUser = $auth.getPayload();

  this.saveChanges = function() {
    this.selected.$update(function() {
      $state.reload();
    })
  }

}