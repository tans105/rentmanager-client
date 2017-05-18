'use strict';

appModule.controller('UserCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
        console.log("OOPS! no cookie");
        $scope.clearLoginStatus();
        $state.go('login');
    }
    else {
        $scope.message = "User page";
        $scope.activateModule("users");
    }
});