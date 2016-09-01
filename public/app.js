'use strict';

angular.module('app', ['ui.router','app.controller', 'app.services'])

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

angular.module('app.controller', [])
  .controller('appController', ['$scope', '$state', function($scope, $state) {

  }]);