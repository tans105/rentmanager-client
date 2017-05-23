/**
 * Created by tanmay on 20/5/17.
 */
'use strict';

appModule.controller('myAppCtrl', function ($scope, $cookies, $state, $rootScope) {

    console.log("App controller reporting on duty");
    $rootScope.loading=false;
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            var cookieData = $cookies.getObject('cookieData');

            if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
                console.log("OOPS! no cookie");
                $scope.clearLoginStatus();
                $state.go('login');
            }
        });

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

    $scope.changeColor = function (bool) {
        if (bool === true) {
            $scope.hoverColour = {'font-size': 'x-large', 'margin-top': '4px', 'color': 'black'};
        } else if (bool === false) {
            $scope.hoverColour = {'font-size': 'x-large', 'margin-top': '4px', 'color': '#1fa67b'};
        }
    };


});