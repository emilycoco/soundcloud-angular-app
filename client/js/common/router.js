angular.module('app.router', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('main', {
        url: '/main',
        views: {
          '' : {
            templateUrl: './partials/main.html',
            controller: 'MainController'
          },
          'rawstream@main' : {
            templateUrl: './partials/rawstream.html',
            controller: 'RawstreamController'
          },
          'player@main' : {
            templateUrl: './partials/player.html',
            controller: 'PlayerController'
          },
          'playlist@main' : {
            templateUrl: './partials/playlist.html',
            controller: 'PlaylistController'
          },
          'search@main' : {
            templateUrl: './partials/search.html',
            controller: 'SearchController'
          }
        }
      });


      $urlRouterProvider.otherwise('/main');

  }]);
