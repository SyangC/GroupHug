angular
  .module("GroupHugApp")
  .factory("Experience", Experience);

Experience.$inject = ["$resource"]
function Experience($resource) {
  return $resource('/api/experiences/:id', { id: '@_id' }, {
    update: { method: "PUT" }
  });
}