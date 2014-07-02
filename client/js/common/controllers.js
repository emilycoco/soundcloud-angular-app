var controllers = angular.module('app.controllers', []);

controllers.controller('main.controller', ['$scope', 'initialize', function($scope, initialize) {

  $scope.authenticate = function() {
    initialize.auth(function() {
      console.log('authentication successful');
    });
  };
}]);


controllers.controller('rawstream.controller', ['$scope', 'initialize','streamFactory', function($scope, initialize, streamFactory) {

  $scope.getReposts = function() {
    initialize.auth(function(){
      streamFactory.getStream('39778833', function(data){
          $scope.user = _.map(data, function(song) {
            return song.track.title;
          });
        });
    });
  };
}]);

controllers.controller('player.controller', [function() {

}]);

controllers.controller('playlist.controller', [function() {

}]);

controllers.controller('search.controller', [function() {

}]);
