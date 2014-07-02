var factories = angular.module('app.factories', []);

factories.factory('streamFactory', ['$q', function($q) {
  return {
    getStream : function(user, func) {
      var deferred = $q.defer();
      SC.get('/e1/me/track_reposts', function(data) {
        deferred.resolve(data);
      });

      return deferred.promise.then(function(data){
        func(data);
      });
    }
  };
}]);


factories.factory('initialize', [ '$q', function($q) {
  return {
    auth: function(func) {
      SC.initialize({
        client_id: '7435cc28ae7b18f5642ac9195805213c',
        redirect_uri: 'http://localhost:3000/#/main',
        scope: 'non-expiring',
        access_token: localStorage.getItem('access_token')
      });
      if (!SC.isConnected()) {
        var deferred = $q.defer();
        SC.connect(function(){
          SC.get('/me', function(data, error){
            deferred.resolve(data);
            if(error){
              alert('Error: ' + error.message);
            } else {
              return deferred.promise.then(function(data) {
                localStorage.setItem('access_token', SC.accessToken());
                func();
              });
            }
          });
        });
      } else {
        func();
      }
    }
  };
}]);

