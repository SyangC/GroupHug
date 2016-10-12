angular
  .module("GroupHugApp", ["ngResource", "ui.router", "satellizer"])
  .config(oAuthConfig)
  .config(Router)

oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  $authProvider.twitter({
    url: "/api/oauth/twitter",
    clientId: //no idea. Need to look into this later, as I did not do twitter for my project.
  })
  $authProvider.facebook({
    url: "/api/oauth/facebook",
    clientId: "1115097508582543"
  })
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "/templates/home.html",
      controller: "MainController as main"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("experiencesIndex", {
      url: "/experiences",
      templateUrl: "/templates/experiences/experiencesIndex.html",
      controller: "ExperiencesIndexController as experiencesIndex"
    })
    .state("experiencesNew", {
      url: "/experiences",
      templateUrl: "/templates/experiences/experiencesNew.html",
      controller: "ExperiencesNewController as experiencesNew"
    })
    .state("experiencesShow", {
      url: "/experiences/:id",
      templateUrl: "/templates/experiences/experiencesShow.html",
      controller: "ExperiencesShowController as experiencesShow"
    })
    .state("experiencesEdit", {
      url: "/experiences/:id",
      templateUrl: "/templates/experiences/experiencesEdit.html",
      controller: "ExperiencesEditController as experiencesEdit"
    })
    .state("grouphugsIndex", {
      url: "/grouphugs",
      templateUrl: "/templates/grouphugs/grouphugsIndex.html",
      controller: "GrouphugsIndexController as grouphugsIndex"
    })
    .state("grouphugsNew", {
      url: "/grouphugs",
      templateUrl: "/templates/grouphugs/grouphugsNew.html",
      controller: "GrouphugsNewController as grouphugsNew"
    })
    .state("grouphugsShow", {
      url: "/grouphugs/:id",
      templateUrl: "/templates/grouphugs/grouphugsShow.html",
      controller: "GrouphugsShowController as grouphugsShow"
    })
    .state("grouphugsEdit", {
      url: "/grouphugs/:id",
      templateUrl: "/templates/grouphugs/grouphugsEdit.html",
      controller: "GrouphugsEditController as grouphugsEdit"
    })
    .state("usersIndex", {
      url: "/users",
      templateUrl: "/templates/users/usersIndex.html",
      controller: "UsersIndexController as usersIndex"
    })
    .state("usersShow", {
      url: "/users/:id",
      templateUrl: "/templates/users/usersShow.html",
      controller: "UsersShowController as usersShow"
    });

    $urlRouterProvider.otherwise("/home");
}