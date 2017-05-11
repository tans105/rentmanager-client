'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.register'
  ]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
