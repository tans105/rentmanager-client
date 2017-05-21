'use strict';

appModule.controller('UserManagementCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "User Management page";
        $scope.activateModule("userManagement");
    }
});