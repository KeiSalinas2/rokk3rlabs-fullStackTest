'use strict';


angular.module('app.services', [])
  .service('lodash', ['$window', function($window) {
    return $window._;
  }]);