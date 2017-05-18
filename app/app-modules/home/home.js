'use strict';


appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');

    if (angular.isUndefined(cookieData) || cookieData == null || !cookieData) {
        $scope.clearLoginStatus();
        $state.go('login');
    }
    $scope.selectedModule=cookieData.moduleList[0];
    $scope.changeLoginStatus(cookieData);
    $scope.moduleList = cookieData.moduleList;

    $scope.activateModule=function(module){
        $scope.selectedModule=module;
    };
    $state.go('home.admin');


});