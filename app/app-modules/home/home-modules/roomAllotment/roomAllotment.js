'use strict';

appModule.controller('RoomAllotmentCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Room Allotment page";
        $scope.activateModule("roomAllotment");
    }
});