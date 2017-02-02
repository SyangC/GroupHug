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
  .factory("Thankyou", Thankyou);

Thankyou.$inject = ["$resource", "formData"]
function Thankyou($resource, formData) {
  return $resource('/api/thankyous/:id', { id: '@_id' }, {
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