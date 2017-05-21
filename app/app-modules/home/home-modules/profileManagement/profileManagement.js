'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Profile Management";
        $scope.activateModule("profileManagement");
    }
});