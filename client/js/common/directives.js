var directives = angular.module('app.directives', []);

directives.directive('soundcloudPlayer', function() {
  return {
    restrict: 'E',
    template: '<div>{{trackUrl}}</div>',
    replace: true,
    scope: {
      trackUrl: '=',
      height: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.getOembed = function(song, height, element) {
        SC.oEmbed(song, {maxheight: height}, function(oEmbed) {
          element.replaceWith(oEmbed.html);
        });
      };
    }],
    link: function(scope, elem, attrs) {


      var fetchOembed = function() {
        scope.getOembed(scope.trackUrl, attrs.height, elem);
        console.log(scope.trackUrl);
      };
      fetchOembed();
    }
  };
});


