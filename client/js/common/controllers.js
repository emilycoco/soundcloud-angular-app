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
    playlist.setCurrentSong(song);
  };

}]);

controllers.controller('PlayerController', ['$scope', 'playlist', function($scope, playlist) {
  $scope.currentSong = playlist.currentSong;

  $scope.$watch(function() {
    return playlist.currentSong;
  }, function() {
    $scope.currentSong = playlist.currentSong;
  });

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
