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
  this.currentSong = this.currentSong || {id: 155809266};

  this.addToPlaylist = function(song) {
    this.playlist[song.id] = song;
    this.currentSong = song;
  };

  this.removeFromPlaylist = function(song) {
    delete this.playlist[song.id];
  };

  this.setCurrentSong = function(song) {
    this.currentSong = song;
  };

  this.playNextSong = function() {
    var that = this;
    SC.whenStreamingReady(function() {
      widget = SC.Widget(document.querySelector('iframe'));
      widget.bind(SC.Widget.Events.FINISH, function(player) {
        that.setCurrentSong({permalink_url: "http://soundcloud.com/cleanbandit/come-over-feat-stylo-g"});
        console.log(that);
      });
    });
  };
});

services.service('player',['playlist', function(playlist) {
  this.playNextSong = function() {
    SC.whenStreamingReady(function() {
      widget = SC.Widget(document.querySelector('iframe'));
      widget.bind(SC.Widget.Events.FINISH, function(player) {

      });
    });
  };
}]);

