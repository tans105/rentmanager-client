'use strict';


appModule.controller('AdminCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
        console.log("OOPS! no cookie");
        $scope.clearLoginStatus();
        $state.go('login');
    }
    else {
        $scope.message = "Admin page";
        $scope.activateModule("admin");
    }
});