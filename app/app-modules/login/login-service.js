/**
 * Created by tanmay on 24/5/17.
 */
'use strict';

appModule.service('loginService', function ($http, jwtHelper, $cookies, AppService) {
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
        var displayName = this.getDisplayNameForUser(tokenPayload);
        var cookieData = {
            "isLoggedIn": true,
            "token": data.data.token,
            "moduleList": data.data.moduleList,
            "loggedInUser": displayName,
            "role": tokenPayload.role,
            "roleId": tokenPayload.roleId,
            "hostelName": tokenPayload.hostelName
        };
        $cookies.putObject("cookieData", cookieData, {'expires': expiresValue});
    }

    this.getDisplayNameForUser = function (tokenPayload) {
        if (AppService.isUndefinedOrNull(tokenPayload.middleName) && AppService.isUndefinedOrNull(tokenPayload.lastName)) {
            return tokenPayload.firstName;
        }
        else if (AppService.isUndefinedOrNull(tokenPayload.middleName) && !AppService.isUndefinedOrNull(tokenPayload.lastName)) {
            return tokenPayload.firstName + " " + tokenPayload.lastName;
        }
        else if (AppService.isUndefinedOrNull(tokenPayload.lastName) && !AppService.isUndefinedOrNull(tokenPayload.middleName)) {
            return tokenPayload.firstName + " " + tokenPayload.middleName;
        }
        else {
            return tokenPayload.firstName + " " + tokenPayload.middleName + " " + tokenPayload.lastName;
        }
    }
});