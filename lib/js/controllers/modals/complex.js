angular
  .module('GroupHugApp')
  .controller('ModalsComplexController', ModalsComplexController);


ModalsComplexController.$inject = [
  '$scope', '$element', 'title','close', 'Contribution'];

function ModalsComplexController($scope, $element, title, close, Contribution) {

  $scope.name = null;
  $scope.message = null;
  $scope.title = title
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      name: $scope.name,
      message: $scope.message
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log("Name ",$scope.name,"Age ",$scope.message);
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
    console.log("Name ",name,"Age ",age);
  };

};