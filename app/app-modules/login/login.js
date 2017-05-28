'use strict';


appModule.controller('LoginCtrl', function ($scope, $state, loginService, $cookies, jwtHelper, $rootScope, loaderService, cfpLoadingBar) {
    console.log("Login controller reporting on duty");
    $scope.user = {
        userId: 'ADM0000000001',
        password: 'password'
    }
    $scope.hasError = false;
    $scope.clearLoginStatus();
    var loginSuccess = function (data) {
        // loaderService.generateEvent("show-loader", false);
        cfpLoadingBar.complete();
        console.log(data);
        if (angular.isDefined(data) && angular.isDefined(data.data) && data.status == 200) {
            if (data.data.success) {
                var tokenPayload = jwtHelper.decodeToken(data.data.token);
                console.log(tokenPayload);
                var today = new Date();
                var expiresValue = new Date(today);
                expiresValue.setMinutes(today.getMinutes() + 30);
                var cookieData = {
                    "isLoggedIn": true,
                    "token": data.data.token,
                    "moduleList": data.data.moduleList,
                    "loggedInUser": tokenPayload.firstName+" "+tokenPayload.middleName+" "+tokenPayload.lastName,
                    "role": tokenPayload.role,
                    "hostelName":tokenPayload.hostelName
                };
                $cookies.putObject("cookieData", cookieData, {'expires': expiresValue});
                $state.go("home." + data.data.moduleList[0].moduleLink);

            }
            else {
                $scope.hasError = true;
                $scope.errorMsg = data.data.responseMsg;
                $state.go('login');
            }
        }
    };
    $scope.login = function (user) {
        // loaderService.generateEvent("show-loader", true);
        cfpLoadingBar.start();
        loginService.loginValidation(user.userId, user.password, loginSuccess)
    }
});

