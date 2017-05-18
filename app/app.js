'use strict';

var appModule = angular.module('myApp', [
    'ui.router',
    'ngCookies',
    'angular-jwt'
]);

appModule.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'login',
        url: '/login',
        templateUrl: 'app-modules/login/login.html',
        controller: 'LoginCtrl'
    })
        .state({
            name: 'register',
            url: '/register',
            templateUrl: 'app-modules/register/register.html',
            controller: 'RegisterCtrl'
        })
        .state({
            name: 'home',
            url: '/home',
            templateUrl: 'app-modules/home/home.html',
            controller: 'HomeCtrl'
        })
        .state({
            name: 'home.admin',
            url: '/admin',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/admin/admin.html',
            controller: 'AdminCtrl'
        })
        .state({
            name: 'home.users',
            url: '/users',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/users/users.html',
            controller: 'UserCtrl'
        })
    // .state("otherwise", 'login')
    $urlRouterProvider.otherwise('/login');

});

appModule.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
});

appModule.controller('myAppCtrl', function ($scope,$cookies,$state) {
    console.log("App controller reporting on duty");
    $scope.isLoggedIn = false;
    $scope.role = '';
    $scope.loggedInUser = '';

    $scope.changeLoginStatus = function (val) {
        $scope.isLoggedIn = val.isLoggedIn;
        $scope.role = val.role;
        $scope.loggedInUser = val.loggedInUser;

    }
    $scope.clearLoginStatus = function () {
        $scope.isLoggedIn = false;
        $scope.role = '';
        $scope.loggedInUser = '';
    }


    $scope.logout = function () {
        $cookies.remove('cookieData');
        $scope.clearLoginStatus();
        $state.go('login');

    }

    $scope.changeColor = function(bool) {
        if(bool === true) {
            $scope.hoverColour = {'font-size': 'x-large', 'margin-top': '4px', 'color': 'black'};
        } else if (bool === false) {
            $scope.hoverColour = {'font-size': 'x-large', 'margin-top': '4px', 'color': '#1fa67b'};
        }
    };
});




