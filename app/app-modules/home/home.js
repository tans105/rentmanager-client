'use strict';


appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');

    if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
        console.log("OOPS! no cookie");
        $scope.clearLoginStatus();
        $state.go('login');
    }
    else {
        $scope.selectedModule = cookieData.moduleList[0].moduleName;
        $scope.changeLoginStatus(cookieData);
        $scope.moduleList = cookieData.moduleList;

        $scope.activateModule = function (moduleName) {
            $scope.selectedModule = moduleName;
        };
        $state.go('home.admin');
    }

});