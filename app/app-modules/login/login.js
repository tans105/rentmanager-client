'use strict';


appModule.controller('LoginCtrl', function ($scope, $state, loginService, $cookies, jwtHelper, $rootScope, loaderService, cfpLoadingBar) {
    console.log("Login controller reporting on duty");
    $scope.user = {
        email: 'tanmayawasthi105@gmail.com',
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
                var today = new Date();
                var expiresValue = new Date(today);
                expiresValue.setMinutes(today.getMinutes() + 10);
                var cookieData = {
                    "isLoggedIn": true,
                    "token": data.data.token,
                    "moduleList": data.data.moduleList,
                    "loggedInUser": "Tanmay",//read them from token
                    "role": "Admin"
                };
                $cookies.putObject("cookieData", cookieData, {'expires': expiresValue});
                $state.go('home');

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
        loginService.loginValidation(user.email, user.password, loginSuccess)
    }
});

