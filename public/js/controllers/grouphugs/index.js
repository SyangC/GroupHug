angular
  .module('GroupHug')
  .controller('GroupHugsIndexController', GroupHugsIndexController);

GroupHugsIndexController.$inject = [""];
function GroupHugsIndexController() {
  this.all = GroupHug.query();
}