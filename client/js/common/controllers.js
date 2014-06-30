var controllers = angular.module('app.controllers', []);

controllers.controller('main.controller', ['$scope', 'streamFactory', 'authFactory', function($scope, streamFactory, authFactory) {

  streamFactory.getStream('39778833', function(data){
    $scope.user = _.map(data[0].tracks, function(song) {
      return song.title;
    });
  });

  authFactory.authUser();
}]);
