'use strict';

var appModule = angular.module('myApp', [
    'ui.router',
    'ngCookies'
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

appModule.config(function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['X-Requested-With']='XMLHttpRequest';
});


