/**
 * Created by tanmay on 6/6/17.
 */

'use strict'

appModule.service('UserManagementService', function ($http) {

    var thisRef = this;
    this.fetchTemplate = function (token, callback) {
        $http({
            url: "http://localhost:8080/api/user/getNewUserForm",
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
    };


    this.addUser = function (token, personalDetails, roleId, callback) {
        $http({
            url: "http://localhost:8080/api/user/addUser",
            method: "POST",
            data: {
                "personalDetails": personalDetails,
                "roleId": roleId
            },
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

    this.parseToNumeric = function (response) {
        angular.forEach(response.formSchema, function (value, key) {
            for (var i = 0; i < value.stack.length; i++) {
                if (value.stack[i].fieldType == 'number') {
                    response.personalDetails[value.stack[i].fieldId] = parseInt(response.personalDetails[value.stack[i].fieldId]);
                }
            }
        });
    }

    this.fetchHostelData = function (token, callback) {
        $http({
            url: "http://localhost:8080/api/user/fetchHostelData",
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

    this.fetchUserIdFromTableRow = function (row) {
        var userId = undefined;
        angular.forEach(row, function (instance) {
            if (instance.id == 'user_id') {
                userId = instance.value;
            }
        });
        return userId;
    }
});