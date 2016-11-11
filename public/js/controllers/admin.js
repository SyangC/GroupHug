angular
  .module("GroupHugApp")
  .controller("AdminUiController", AdminUiController);

AdminUiController.$inject = ["User", "Grouphug", "Experience", "$state", "$auth", "$rootScope", "$http"];
function AdminUiController(User, Grouphug, Experience, $state, $auth, $rootScope, $http) {
  var self = this;

  this.allUsers = User.query();

  this.allGrouphugs = Grouphug.query();

  this.allExperiences = Experience.query();

  this.currentUser = $auth.getPayload();

}