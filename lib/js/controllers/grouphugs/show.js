angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);

GrouphugsShowController.$inject = ["Grouphug", "$state", "$scope", "$auth"];
function GrouphugsShowController(Grouphug, $state, $scope, $auth) {
  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("grouphugsIndex");
    })
  }

  this.averageWeight = function(experience) {
    var weightTotal = 0;
    var weightCount = 0;
    experience.userWeightings.forEach(function(userWeighting) {
      weightTotal += userWeighting.weightValue;
      weightCount++;
    })
    if (weightCount === 0) return "No Ratings";
    return weightTotal/weightCount;
  }

  this.canVote = function(experience, user) {
    if (experience.userWeightings.filter(function(weighting) { return weighting.user == user }).length > 0 || !user) {
      return false;
    } else {
      return true;
    }
  }

  this.saveWeightings = function() {
    var weightCount = 0;
    var userId = $auth.getPayload();
    this.selected.experiences.forEach(function(experience) {
      if (!!experience.newWeighting) {
        experience.userWeightings.push({
          user: userId,
          weightValue: +experience.newWeighting
        })
        weightCount++;
      }
    })



    if (weightCount > 0) {
      this.selected.$update(function() {
        $state.reload();
      })
    }
  }

  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      window.alert('success! token: ' + result.id);
    }
  };
}