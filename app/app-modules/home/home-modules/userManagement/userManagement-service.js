/**
 * Created by tanmay on 6/6/17.
 */

'use strict'

appModule.service('userManagementService', function ($http) {

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

    this.convertKeyToLabel = function(key){
        return (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ');
    };

    this.formatTabularData = function(data, colOrder){
        var formattedData = [];
        var columnMaping = {};
        if(angular.isDefined(data) && angular.isDefined(data[0])){
            var tempInstance = data[0];
            for(var key in tempInstance){
                if(colOrder.indexOf(key) > -1){
                    columnMaping[key] = {
                        id: key,
                        order: colOrder.indexOf(key),
                        label: thisRef.convertKeyToLabel(key)
                    };
                }
            }
            angular.forEach(data, function(instance){
                var tempData = angular.copy(columnMaping);
                var tempArray = [];
                for(var key in instance){
                    if(angular.isDefined(tempData[key]) && tempData[key].id == key){
                        tempData[key].value = instance[key];
                        tempArray.push(tempData[key]);
                    }
                }
                formattedData.push(angular.copy(tempArray));
            });
            console.log(formattedData);
        }
        return formattedData;
    }

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

    this.fetchHostelData = function (token,callback) {
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
});