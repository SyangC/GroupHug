angular
  .module("GroupHugApp")
  .factory("Grouphug", Grouphug);

Grouphug.$inject = ["$resource", "formData"]
function Grouphug($resource, formData) {
  return $resource('/api/grouphugs/:id', { id: '@_id' }, {
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