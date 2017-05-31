/**
 * Created by tanmay on 24/5/17.
 */
'use strict';

appModule.service('loginService', function ($http, jwtHelper, $cookies) {
    var cookieValidDuration = 30;

    this.loginValidation = function (userId, pwd, callback) {
        $http({
            url: "http://localhost:8080/user/authenticate   ",
            method: "POST",
            data: {'userId': userId, 'password': pwd}
        })
            .then(function (response) {
                    callback(response);
                },
                function (response) {
                    callback();
                });

    }

    this.generateCookie = function (data) {
        var tokenPayload = jwtHelper.decodeToken(data.data.token);
        var today = new Date();
        var expiresValue = new Date(today);
        expiresValue.setMinutes(today.getMinutes() + cookieValidDuration);
        var cookieData = {
            "isLoggedIn": true,
            "token": data.data.token,
            "moduleList": data.data.moduleList,
            "loggedInUser": tokenPayload.firstName + " " + tokenPayload.middleName + " " + tokenPayload.lastName,
            "role": tokenPayload.role,
            "roleId": tokenPayload.roleId,
            "hostelName": tokenPayload.hostelName
        };
        $cookies.putObject("cookieData", cookieData, {'expires': expiresValue});
    }


});