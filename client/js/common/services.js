var services = angular.module('app.services', []);

services.factory('streamFactory', ['$q', function($q) {
  return {
    getStream : function(func) {
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

services.factory('searchFactory', ['$q', function($q) {
  return {
    getSearch : function(query, func) {
      var deferred = $q.defer();
      SC.get('/tracks', {q: query}, function(data) {
        deferred.resolve(data);
      });

      return deferred.promise.then(function(data){
        func(data);
      });
    }
  };
}]);


services.factory('initialize', [ '$q', function($q) {
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

services.service('playlist', function() {
  this.playlist = {};
  this.currentIndex = 0;
  this.currentSong = this.currentSong || {permalink_url: "http://soundcloud.com/coldmagnet/capital-cities-safe-and-sound-cold-magnet-remix"};

  this.addToPlaylist = function(song) {
    this.playlist[song.id] = song;
  };

  this.removeFromPlaylist = function(song) {
    delete this.playlist[song.id];
  };

  this.setCurrentSong = function(song) {
    this.currentSong = song;
  };
});

