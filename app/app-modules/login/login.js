'use strict';


appModule.controller('LoginCtrl', function ($scope, $state, loginService, loaderService, cfpLoadingBar, $log) {
    $scope.user = {
        userId: 'ADM0000000001',
        password: 'password'
    }
    $scope.hasError = false;
    $scope.clearLoginStatus();
    var loginSuccess = function (data) {
        // loaderService.generateEvent("show-loader", false);
        cfpLoadingBar.complete();
        $log.warn("<--LOGIN RESPONSE-->");
        $log.info(data);
        if (angular.isDefined(data) && angular.isDefined(data.data) && data.status == 200) {
            if (data.data.success) {
                loginService.generateCookie(data);
                $state.go(data.data.moduleList[0].moduleLink);
            }
            else {
                $scope.hasError = true;
                $scope.errorMsg = data.data.responseMsg;
                $state.go('login');
            }
        }
        else{
            $scope.hasError=true;
            $scope.errorMsg="Could not connect to Server";
        }
    };
    $scope.login = function (user) {
        // loaderService.generateEvent("show-loader", true);
        cfpLoadingBar.start();
        loginService.loginValidation(user.userId, user.password, loginSuccess)
    }
});

