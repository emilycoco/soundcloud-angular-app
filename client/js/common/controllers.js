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
  $scope.addToPlaylist = playlist.addToPlaylist;

}]);

controllers.controller('PlayerController', ['$scope', 'playlist', function($scope, playlist) {
  $scope.currentSong = playlist.currentSong;
}]);

controllers.controller('PlaylistController', ['$scope', 'playlist', function($scope, playlist) {
  $scope.playlist = playlist.playlist;
  $scope.currentIndex = playlist.currentIndex;
  $scope.removeFromPlaylist = playlist.removeFromPlaylist;
}]);

controllers.controller('SearchController', [function() {

}]);
