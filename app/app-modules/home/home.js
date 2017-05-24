'use strict';


appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies, loaderService) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.selectedModule = cookieData.moduleList[0].moduleName;
        $scope.changeLoginStatus(cookieData);
        $scope.moduleList = cookieData.moduleList;

        $scope.activateModule = function (moduleName) {
            $scope.selectedModule = moduleName;
        };
        $state.go('home.profileManagement');

    }

});