angular
  .module('GroupHugApp')
  .factory('formData', formData);

function formData() {
  return {
    transform: function(data) {
      var formData = new FormData();
      angular.forEach(data, function(value, key) {
        if(!!value && value._id) value = value._id;
        if(!key.match(/^\$/)) {

          if(value instanceof FileList) {
            for(i=0;i<value.length;i++) {
              formData.append(key, value[i]);
            }
          } else if(key === "experiences") {
            formData.append(key, angular.toJson(value, false));
          } else {
            formData.append(key, value);
          }
        }
      });
      return formData;
    }
  }
}