angular.module('app.controller', [])
  .controller('appController', ['$scope', '$state', 'ApiService','lodash', function($scope, $state, Api, _) {

    $scope.templates = {
      header: 'templates/base/header_tpl.html',
      content: 'templates/base/content_tpl.html',
      create: 'templates/base/create_tpl.html',
      tasks: 'templates/base/lists_tpl.html'
    };

    $scope.enableCreate = false;
    $scope.priorities = [{type: 1}, {type: 2}, {type: 3}, {type: 4}, {type: 5}];

    $scope.newTask = {};

    $scope.createTask = function(){
      var data = {
        name: $scope.newTask.name,
        dueDate: $scope.newTask.dueDate,
        priority: !_.isNull($scope.newTask.priority) ? $scope.newTask.priority.type : 'normal'
      };

      Api.createTask(data).then(function(res){
        console.log(res);
      })
    };

    Api.apiTest().then(function(resp){
      console.log(resp);
    });
  }]);