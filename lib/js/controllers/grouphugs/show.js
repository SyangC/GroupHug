angular
  .module("GroupHugApp")
  .controller("GrouphugsShowController", GrouphugsShowController);

GrouphugsShowController.$inject = ["User", "Grouphug", "$state", "$scope"];
function GrouphugsShowController(User, Grouphug, $state, $scope) {
  this.selected = Grouphug.get($state.params, function(res) {
    console.log("res", res);
  })

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("grouphugsIndex");
    })
  }

  

  this.allUsers = User.query();

  this.newContributorEmail = null

  this.addContributor = function(){
    console.log(this.selected.gifteeFirstName);
    console.log(this.selected.contributorEmailAddresses);
    
    if(this.newContributorEmail){
      if(this.selected.contributorEmailAddresses.indexOf(this.newContributorEmail) > -1 ){
         window.alert("already exists can't be added");
         this.newContributorEmail = null;
       }
        else {
        window.alert("ok");
        console.log("adding ",this.newContributorEmail, "to the list", this.selected.contributorEmailAddresses,"for ",this.selected.gifteeFirstName,"length",this.selected.contributorEmailAddresses.length);
        this.selected.contributorEmailAddresses.push(this.newContributorEmail);
        this.selected.$update();
        this.newContributorEmail = null;
      }
    };
  }

  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      window.alert('success! token: ' + result.id);
    }
  };
}