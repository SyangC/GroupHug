angular
  .module("GroupHugApp")
  .factory("Grouphug", Grouphug);

Grouphug.$inject = ["$resource"]
function Grouphug($resource) {
  return $resource('/api/grouphugs/:id', { id: '@_id' }, {
    // update: { method: "PUT" }
    update: {
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    save: {
      method: "POST",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    }
  });
}