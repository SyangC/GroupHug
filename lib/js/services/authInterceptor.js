angular
  .module('GroupHugApp')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['TokenService', '$rootScope'];
function AuthInterceptor(TokenService, $rootScope) {
  return {
    request: function(req) {
      var token = TokenService.getToken();

      if(!!req.url.match('/api') && token) {
        req.headers.Authorization = 'Bearer ' + token;
      }

      // console.log(req.headers);
      return req;
    },
    response: function(res) {
      if(!!res.config.url.match('/api') && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    },
    responseError: function(res) {
      if(res.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return res.data;
    }
  };
}