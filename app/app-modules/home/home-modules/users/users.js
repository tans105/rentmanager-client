'use strict';

appModule.controller('UserCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "User page";
        $scope.activateModule("users");
    }
});