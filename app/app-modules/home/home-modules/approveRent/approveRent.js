'use strict';

appModule.controller('ApproveRentCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Approve Rent page";
        $scope.activateModule("approveRent");
    }
});