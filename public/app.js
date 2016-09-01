'use strict';

angular.module('app', ['ui.router','ui.bootstrap','app.controller', 'app.services'])

angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          '': { templateUrl: './templates/base/app.html', controller: 'appController' }
        }
      });

    $urlRouterProvider.otherwise('/');
  }]);

