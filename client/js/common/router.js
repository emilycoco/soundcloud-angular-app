angular.module('app.router', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('/', {
        url: '/',
        templateUrl: './partials/rawStream.html',
        controller: 'main.controller'
      });

      $urlRouterProvider.otherwise('/');

  }]);
