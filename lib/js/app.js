angular
  .module("GroupHugApp", ["ngResource", "ui.router","angular-jwt", "satellizer", "angularPayments"])
  .config(oAuthConfig)
  .config(setupInterceptor)
  .config(Router)
  .config(function() {
    Stripe.setPublishableKey("pk_test_UwzuaWQwCBqL92hiVkmzupiJ");
  })

oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  // $authProvider.twitter({
  //   url: "/api/oauth/twitter",
  //   clientId: //no idea. Need to look into this later, as I did not do twitter for my project.
  // })
  $authProvider.facebook({
    url: "/api/oauth/facebook",
    clientId: "1115097508582543"
  })
}

setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider){
  return $httpProvider.interceptors.push("AuthInterceptor");
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
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
    .state("adminUi", {
      url: "/adminUi",
      templateUrl: "/templates/adminUi.html",
      controller: "AdminUiController as admin"
    })
    .state("adminUiGrouphugShow", {
      url: "/adminUi/grouphugs/:id",
      templateUrl: "/templates/admin/show.html",
      controller: "adminUiGrouphugShowController as grouphugsShow"
    })
    .state("experiencesIndex", {
      url: "/experiences",
      templateUrl: "/templates/experiences/index.html",
      controller: "ExperiencesIndexController as experiencesIndex"
    })
    .state("experiencesNew", {
      url: "/experiences/new",
      templateUrl: "/templates/experiences/new.html",
      controller: "ExperiencesNewController as experiencesNew"
    })
    .state("experiencesShow", {
      url: "/experiences/:id",
      templateUrl: "/templates/experiences/show.html",
      controller: "ExperiencesShowController as experiencesShow"
    })
    .state("experiencesEdit", {
      url: "/experiences/:id/edit",
      templateUrl: "/templates/experiences/edit.html",
      controller: "ExperiencesEditController as experiencesEdit"
    })
    .state("thankyousIndex", {
      url: "/thankyous",
      templateUrl: "/templates/thankyous/index.html",
      controller: "ThankyousIndexController as thankyousIndex"
    })
    .state("thankyousShow", {
      url: "/thankyous/:id",
      templateUrl: "/templates/thankyous/show.html",
      controller: "ThankyousShowController as thankyousShow"
    })
    .state("thankyousEdit", {
      url: "/thankyous/:id/edit",
      templateUrl: "/templates/thankyous/edit.html",
      controller: "ThankyousEditController as thankyousEdit"
    })
    .state("grouphugsIndex", {
      url: "/grouphugs",
      templateUrl: "/templates/grouphugs/index.html",
      controller: "GrouphugsIndexController as grouphugsIndex"
    })
    .state("grouphugsNew", {
      url: "/grouphugs/new",
      templateUrl: "/templates/grouphugs/new.html",
      controller: "GrouphugsNewController as grouphugsNew"
    })
    .state("grouphugsShow", {
      url: "/grouphugs/:id",
      templateUrl: "/templates/grouphugs/show.html",
      controller: "GrouphugsShowController as grouphugsShow"
    })
    .state("grouphugsEdit", {
      url: "/grouphugs/:id/edit",
      templateUrl: "/templates/grouphugs/edit.html",
      controller: "GrouphugsEditController as grouphugsEdit"
    })
    .state("usersIndex", {
      url: "/users",
      templateUrl: "/templates/users/index.html",
      controller: "UsersIndexController as usersIndex"
    })
    .state("usersShow", {
      url: "/users/:id",
      templateUrl: "/templates/users/show.html",
      controller: "UsersShowController as usersShow"
    })
    .state("usersWelcome", {
      url: "/welcome/:id",
      templateUrl: "/templates/users/welcome.html",
      controller: "UsersWelcomeController as usersWelcome"
    })
    .state("usersEdit", {
      url: "/users/edit/:id",
      templateUrl: "/templates/users/edit.html",
      controller: "UsersEditController as usersEdit"
    })
   
    .state("userActivated",{
      url: "/activated",
      templateUrl: "/templates/users/activated.html",
      controller: "UsersEditController as usersEdit"
    })
    .state("unauthorised",{
      url: "/unauthorised",
      templateUrl: "/templates/unauthorised.html",
      controller: "MainController as main"
    })



    $urlRouterProvider.otherwise("/");
}