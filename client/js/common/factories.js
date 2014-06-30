var factories = angular.module('app.factories', []);

factories.factory('streamFactory', ['$q', function($q) {
  return {
    getStream : function(user, func) {
      var deferred = $q.defer();

      SC.initialize({
        client_id: '7435cc28ae7b18f5642ac9195805213c'
      });

      SC.get('/users/39778833/playlists', function(data) {
        deferred.resolve(data);
      });

      return deferred.promise.then(function(data){
        func(data);
      });
    }
  };
}]);

factories.factory('authFactory', [function() {
  return {
    authUser : function() {
      SC.initialize({
        client_id: '7435cc28ae7b18f5642ac9195805213c',
        redirect_uri: 'http://localhost:3000/#/',
      });

      SC.connect(function(){
        SC.get('/me/activities/tracks/affiliated', function(data, error){
          if(error){
            alert('Error: ' + error.message);
          }else{
            var stream = _.map(data.collection, function(song) {
              return song.origin.title;
            });
            console.log(stream);
          }
        });
      });
    }
  };
}]);
