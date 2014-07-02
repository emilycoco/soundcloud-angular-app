var directives = angular.module('app.directives', []);

directives.directive('soundcloudPlayer', function() {
  return {
    restrict: 'E',
    require: '^trackUrl',
    template: '<div>{{trackUrl}}</div>',
    scope: {
      trackUrl: '@',
      height: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.getOembed = function(song, height, element) {
        SC.oEmbed(song, {auto_play: false, maxheight: height}, function(oEmbed) {
          element.replaceWith(oEmbed.html);
        });
      };
    }],
    link: function(scope, elem, attrs) {
      scope.getOembed(attrs.trackUrl, attrs.height, elem);
    }
  };
});

directives.directive('trackUrl', function() {
  return {
    controller: function($scope) {
    }
  };
});

directives.directive('height', function() {
  return {
    controller: function($scope) {
    }
  };
});
