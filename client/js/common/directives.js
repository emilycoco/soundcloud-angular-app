var directives = angular.module('app.directives', []);

directives.directive('soundcloudPlayer', function() {
  return {
    restrict: 'E',
    template: '<div>{{trackUrl}}</div>',
    replace: true,
    transclude: true,
    scope: {
      trackUrl: '@',
      height: '@'
    },
    link: function(scope, elem, attrs) {
      scope.$watch(function() {
        return scope.trackUrl;
      }, function() {
        SC.oEmbed(scope.trackUrl, {maxheight: attrs.height}, function(oEmbed) {
          elem.html(oEmbed.html);
        });
      });
    }
  };
});

