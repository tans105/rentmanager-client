'use strict';

var appModule = angular.module('myApp', [
    'ui.router',
    'ngCookies',
    'angular-jwt',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'cfp.loadingBar',
    'ngMaterial',
    'angular-momentjs',
    'smart-table',
    'ui-notification'
]);


appModule.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

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
            name: 'home.404',
            url: '/404',
            templateUrl: 'app-modules/home/home-modules/404/404.html',
            controller: '404Ctrl'
        })
        // .state({
        //     name: 'home.profileManagement',
        //     url: '/profileManagement',
        //     parent: 'home',
        //     templateUrl: 'app-modules/home/home-modules/profileManagement/profileManagement.html',
        //     controller: 'ProfileManagementCtrl'
        // })
        .state({
            name: 'home.personalDetails',
            url: '/personalDetails',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/personalDetails/personalDetails.html',
            controller: 'PersonalDetailsCtrl'
        })
        .state({
            name: 'home.userManagement',
            url: '/userManagement',
            parent: 'home',
            template: '<div ui-view></div>'
        })
        .state({
            name: 'home.userManagement.details',
            url: '/details',
            parent: 'home.userManagement',
            templateUrl: 'app-modules/home/home-modules/userManagement/userManagement.html',
            controller: 'UserManagementCtrl'
        })
        .state({
            name: 'home.userManagement.addUser',
            url: '/addUser',
            parent: 'home.userManagement',
            templateUrl: 'app-modules/home/home-modules/userManagement/add/addUser.html',
            controller: 'AddUserCtrl'
        })
        .state({
            name: 'home.roomAllotment',
            url: '/roomAllotment',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/roomAllotment/roomAllotment.html',
            controller: 'RoomAllotmentCtrl'
        })
        .state({
            name: 'home.approveRent',
            url: '/approveRent',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/approveRent/approveRent.html',
            controller: 'ApproveRentCtrl'
        })
        .state({
            name: 'home.roomManagement',
            url: '/roomManagement',
            parent: 'home',
            templateUrl: 'app-modules/home/home-modules/roomManagement/roomManagement.html',
            controller: 'RoomManagementCtrl'
        });
    $urlRouterProvider.otherwise('/home/404');

});


appModule.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
});

appModule.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('YYYY-MM-DD');
    };
});





