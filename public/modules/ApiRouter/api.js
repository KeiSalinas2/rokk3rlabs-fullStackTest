angular.module('app.services').service('ApiService', ['$http', function($http) {

    'use strict';
    var url = 'http://localhost:3001/';

    this.apiTest = function(){
      return $http.get(url + 'tasks/');
    };

  }]);