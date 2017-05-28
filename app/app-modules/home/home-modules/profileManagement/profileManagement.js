'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, fetchProfileDetailsService, $parse) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Profile Management";
        $scope.activateModule("profileManagement");

        var profileFetchSuccess = function (response) {
            if (response.data.success) {
                console.log(response.data.formSchema);
                console.log(response.data.personalDetails);
                $scope.formSchema = response.data.formSchema;
                $scope.personalDetails = response.data.personalDetails;


                for (var property in $scope.personalDetails) {
                    if ($scope.personalDetails.hasOwnProperty(property)) {
                        if (property == 'userId') {
                            continue;
                        }
                        else {
                            $parse(property).assign($scope, $scope.personalDetails[property]);
                        }
                    }
                }
            }
        }
        fetchProfileDetailsService.fetchProfile(cookieData.token, profileFetchSuccess);
    }

});


appModule.service('fetchProfileDetailsService', function ($http) {
    this.fetchProfile = function (token, callback) {
        $http({
            url: "http://localhost:8080/api/profile",
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