angular.module('app.controller', [])
  .controller('appController', ['$scope', '$state', 'ApiService', 'lodash', function($scope, $state, Api, _) {

    $scope.templates = {
      header: 'templates/base/header_tpl.html',
      content: 'templates/base/content_tpl.html',
      create: 'templates/base/create_tpl.html',
      tasks: 'templates/base/lists_tpl.html'
    };

    $scope.enableCreate = false;
    $scope.isEdit = false;
    $scope.notificationSuccess = false;
    $scope.notificationError = false;
    $scope.sortTasks = '';

    $scope.priorities = [{ type: 1 }, { type: 2 }, { type: 3 }, { type: 4 }, { type: 5 }];

    $scope.newTask = {};

    $scope.createTask = function() {
      var data = {
        name: $scope.newTask.name,
        dueDate: $scope.newTask.dueDate,
        priority: !_.isNull($scope.newTask.priority) ? $scope.newTask.priority.type : 'normal'
      };

      Api.createTask(data).then(function(res) {
        console.log(res);
        if (res.status === 201) {
          $scope.notificationSuccess = true;
          setTimeout(function() {
            $scope.notificationSuccess = false;
          }, 1000);
          $scope.loadTasks();
        }
      })
    };

    $scope.loadTasks = function() {

      Api.apiLoadTasks().then(function(resp) {
        $scope.overdue = [];
        $scope.pending = [];
        var today = Date.parse(new Date());
        var data = resp.data;
        _.forEach(data, function(task) {
          var _date = Date.parse(new Date(task.dueDate));
          task.dueDate = _date;
          if (_date > today)
            $scope.pending.push(task)
          else
            $scope.overdue.push(task);
        });
      }, showError);
    };

    $scope.sortData = function(task) {
      $scope.overdue = _.orderBy($scope.overdue, [task], ['asc']);
      $scope.pending = _.orderBy($scope.pending, [task], ['asc']);
    };

    $scope.initEdit = function(task) {
      task.dueDate = new Date(task.dueDate);
      $scope.newTask = task;
      $scope.isEdit = true;
    };

    $scope.updateTask = function(task) {
      var data = {
        id: task._id,
        name: task.name,
        dueDate: task.dueDate,
        priority: !_.isNull(task.priority) ? task.priority.type : 'normal'
      };

      Api.updateTask(data).then(function(res) {
        console.log('update', res);
        $scope.loadTasks();
        $scope.newTask = {};
        $scope.isEdit = false;

        $scope.notificationSuccess = true;
        setTimeout(function() {
          $scope.notificationSuccess = false;
        }, 1000);
      }, showError);
    };

    $scope.deleteTask = function(id) {
      Api.deleteTask(id).then(function(res) {
        if (res.status === 200)
          $scope.loadTasks();
        console.log('delete', res);
      }, showError);
    };

    function showError() {
      $scope.notificationError = true;
      $scope.notificationSuccess = false;
      setTimeout(function() {
        $scope.notificationError = false;
      }, 1000);
    }

  }]);
