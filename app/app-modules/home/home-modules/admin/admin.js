'use strict';


appModule.controller('AdminCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Admin page";
        $scope.activateModule("admin");
    }
});