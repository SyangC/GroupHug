angular
  .module("GroupHugApp")
  .factory("Grouphug", Grouphug);

Grouphug.$inject = ["$resource"];
function Grouphug($resource) {
  return $resource('/api/grouphugs/:id', 
    { id: '@_id' }, 
    { update: {method: "PUT" }
  });
}