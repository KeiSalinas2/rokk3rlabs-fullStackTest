angular.module('app.services').service('ApiService', ['$http', function($http) {

  'use strict';
  var url = 'http://localhost:3001/';

  this.apiLoadTasks = function() {
    return $http.get(url + 'tasks/');
  };

  this.createTask = function(data) {
    return $http.post(url + 'tasks/create?name=' + data.name + '&dueDate=' + data.dueDate + '&priority=' + data.priority);
  };

  this.deleteTask = function(id) {
    return $http.get(url + 'tasks/destroy/' + id);
  };

  this.updateTask = function(data) {
    return $http.post(url + 'tasks/update?id=' + data.id  + '&name=' + data.name + '&dueDate=' + data.dueDate + '&priority=' + data.priority)
  };

}]);
