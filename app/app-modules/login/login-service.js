/**
 * Created by tanmay on 24/5/17.
 */
'use strict';

appModule.service('loginService', function ($http) {

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

    };

});