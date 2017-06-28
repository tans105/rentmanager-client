/**
 * Created by tanmay on 20/5/17.
 */
'use strict';

appModule.controller('myAppCtrl', function ($scope, $cookies, $state, $rootScope, $interval) {

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            var cookieData = $cookies.getObject('cookieData');

            if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
                console.log("OOPS! no cookie");
                $scope.clearLoginStatus();
                $state.go('login');
            }
        });
    $rootScope.loading=false;

    $scope.isLoggedIn = false;
    $scope.role = '';
    $scope.loggedInUser = '';
    $scope.hostelName = '';

    $scope.changeLoginStatus = function (val) {
        $scope.isLoggedIn = val.isLoggedIn;
        $scope.role = val.role;
        $scope.loggedInUser = val.loggedInUser;
        $scope.hostelName = val.hostelName;
    }
    $scope.clearLoginStatus = function () {
        $scope.isLoggedIn = false;
        $scope.role = '';
        $scope.loggedInUser = '';
        $scope.hostelName = '';
    }


    $scope.logout = function () {
        $cookies.remove('cookieData');
        $scope.clearLoginStatus();
        $state.go('login');

    }


    $rootScope.loader = function () {
        $scope.dynamic = 0;
        var progress = $interval(function () {
            $scope.dynamic += 1;
            if ($scope.dynamic == 100) {
                $interval.cancel(progress);
            }
        }, 50);

    }

    $scope.$on('show-loader', function (event, data) {
        $scope.visibleLoader = data;
    })


});

