'use strict';


appModule.controller('LoginCtrl', function ($scope, $state, loginService, $cookies) {
    console.log("Login controller reporting on duty");
    $scope.user = {
        email: 'tanmayawasthi105@gmail.com',
        password: 'password'
    }
    $scope.hasError=false;
    var loginSuccess = function (data) {
        console.log(data);
        if (angular.isDefined(data) && angular.isDefined(data.data) && data.status == 200) {
            if (data.data.success) {
                console.log("Successful Login");
                var today = new Date();
                var expiresValue = new Date(today);
                expiresValue.setMinutes(today.getMinutes() + 10);
                $cookies.putObject("isLoggedIn", true, {'expires': expiresValue});
                $state.go('home');
            }
            else {
                $scope.hasError=true;
                $scope.errorMsg=data.data.responseMsg;
                $state.go('login');
            }
        }
    };

    $scope.login = function (user) {
        loginService.loginValidation(user.email, user.password, loginSuccess)
    }
    $scope.inputType = "password";
    $scope.hideShowPassword = function () {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };

});

appModule.service('loginService', function ($http) {

    this.loginValidation = function (email, pwd, callback) {
        $http({
            url: "http://localhost:8080/user/login",
            method: "POST",
            data: {'email': email, 'password': pwd}
        })
            .then(function (response) {
                    callback(response);
                },
                function (response) {
                    callback();
                });

    };

});