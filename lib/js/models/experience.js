// angular
//   .module("GroupHugApp")
//   .factory("Experience", Experience);

// Experience.$inject = ["$resource"]
// function Experience($resource) {
//   return $resource('/api/experiences/:id', { id: '@_id' }, {
//     update: { method: "PUT" }
//   });
// }

angular
  .module("GroupHugApp")
  .factory("Experience", Experience);

Experience.$inject = ["$resource", "formData"]
function Experience($resource, formData) {
  return $resource('/api/experiences/:id', { id: '@_id' }, {
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