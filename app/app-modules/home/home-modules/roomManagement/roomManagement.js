'use strict';

appModule.controller('RoomManagementCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Room Management page";
        $scope.activateModule("roomManagement");
    }
});