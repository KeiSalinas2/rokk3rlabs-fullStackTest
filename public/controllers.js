angular.module('app.controller', [])
  .controller('appController', ['$scope', '$state', 'ApiService', function($scope, $state, Api) {

    $scope.templates = {
      header: 'templates/base/header_tpl.html',
      content: 'templates/base/content_tpl.html',
      create: 'templates/base/create_tpl.html',
      tasks: 'templates/base/lists_tpl.html'
    };

    Api.apiTest().then(function(resp){
      console.log(resp);
    });
  }]);