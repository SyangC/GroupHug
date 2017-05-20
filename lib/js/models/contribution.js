angular
  .module("GroupHugApp")
  .factory("Contribution", Contribution);

Contribution.$inject = ["$resource"]
function Contribution($resource) {
  return $resource('/api/contributions/:id', { id: '@_id' }, {
    update: { method: "PUT" }
  });
}