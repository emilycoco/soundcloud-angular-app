angular.module('app.router', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('main', {
        url: '/main',
        views: {
          '' : {
            templateUrl: './partials/main.html',
            controller: 'main.controller'
          },
          'rawstream@main' : {
            templateUrl: './partials/rawstream.html',
            controller: 'rawstream.controller'
          },
          'player@main' : {
            templateUrl: './partials/player.html',
            controller: 'player.controller'
          },
          'playlist@main' : {
            templateUrl: './partials/playlist.html',
            controller: 'playlist.controller'
          },
          'search@main' : {
            templateUrl: './partials/search.html',
            controller: 'search.controller'
          }
        }
      });


      $urlRouterProvider.otherwise('/main');

  }]);
