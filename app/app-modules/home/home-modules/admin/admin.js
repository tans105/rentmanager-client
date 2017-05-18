'use strict';


appModule.controller('AdminCtrl', function ($scope, $state, loginService, $cookies) {
    $scope.message = "Admin page";
    $scope.activateModule("admin");
});