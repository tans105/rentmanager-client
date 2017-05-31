/**
 * Created by tanmay on 28/5/17.
 */
'use strict'

appModule.service('personalDetailsService', function ($http) {
    this.fetchProfile = function (token, callback) {
        $http({
            url: "http://localhost:8080/api/profile/fetchProfile",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                    callback(response);
                },
                function (response) {
                    callback();
                });
    }


    this.storeProfile = function (token, personalDetails, callback) {
        $http({
            url: "http://localhost:8080/api/profile/saveProfile",
            method: "POST",
            data: personalDetails,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                    callback(response);
                },
                function (response) {
                    callback();
                });
    }

    this.fetchStateList = function (callback) {
        $http({
            url: "resources/state.json",
            method: "GET"
        }).then(function (response) {
            callback(response);
        }, function (response) {
            callback(response);
        });
    }


});