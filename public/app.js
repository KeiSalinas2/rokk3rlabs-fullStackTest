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
  .controller('appController', ['$scope', '$state', 'ApiService', function($scope, $state, Api) {

    $scope.templates = {
      header: 'templates/base/header_tpl.html',
    };

    Api.apiTest().then(function(resp){
      console.log(resp);
    });
  }]);