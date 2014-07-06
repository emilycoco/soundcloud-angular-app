var controllers = angular.module('app.controllers', []);

controllers.controller('MainController', ['$scope', function($scope) {

}]);


controllers.controller('RawstreamController', ['$scope', 'initialize','streamFactory', 'playlist', function($scope, initialize, streamFactory, playlist) {

  $scope.getReposts = function() {
    initialize.auth(function(){
      streamFactory.getStream(function(data){
          $scope.reposts = _.map(data, function(song) {
            return song.track;
          });
        });
    });
  };

  $scope.playlist = playlist.playlist;
  $scope.addToPlaylist = function(song) {
    playlist.addToPlaylist(song);
    playlist.currentSong = song;
    console.log(playlist.currentSong);
  };

}]);

controllers.controller('PlayerController', ['$scope', '$sce', 'playlist', 'player', function($scope, $sce, playlist, player) {
  $scope.currentSong = playlist.currentSong;

  $scope.$watch(function() {
    return playlist.currentSong;
  }, function() {
    $scope.currentSong = playlist.currentSong;
  });

  $scope.getIframeUrl = function(songId) {
    return $sce.trustAsResourceUrl("http://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/" + songId);
  };


  $scope.playNextSong = function() {
    console.log('called');
    SC.whenStreamingReady(function() {
      var widget = SC.Widget(document.querySelector('iframe').id);
      widget.bind(SC.Widget.Events.PLAY, function(player) {
        $scope.$apply(playlist.currentSong = {id: 157169081});
        console.log('play');
      });
    });
  };
  $scope.playNextSong();

}]);

controllers.controller('PlaylistController', ['$scope', 'playlist', function($scope, playlist) {
  $scope.playlist = playlist.playlist;
  $scope.removeFromPlaylist = playlist.removeFromPlaylist;
}]);

controllers.controller('SearchController', ['$scope', 'initialize', 'searchFactory', 'playlist', function($scope, initialize, searchFactory, playlist) {
  $scope.search = function(query) {
    initialize.auth(function() {
      searchFactory.getSearch(query, function(data) {
        $scope.searchResults = data;
      });
    });
  };

  $scope.playlist = playlist.playlist;
  $scope.addToPlaylist = function(song) {
    playlist.addToPlaylist(song);
    playlist.setCurrentSong(song);
  };
}]);
