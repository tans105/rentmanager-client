'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, personalDetailsService, $parse,cfpLoadingBar) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Profile Management";
        $scope.activateModule("profileManagement");

        var profileFetchSuccess = function (response) {
            cfpLoadingBar.complete();
            console.log(response);
            if (response.data.success) {
                // console.log(response.data.formSchema);
                // console.log(response.data.personalDetails);
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
        var profileStoreSuccess = function (response) {
            cfpLoadingBar.complete();
            console.log(response);
        }
        $scope.storeInfo = function () {
            for (var property in $scope.personalDetails) {
                if ($scope.personalDetails.hasOwnProperty(property)) {
                    if (property == 'userId') {
                        continue;
                    }
                    else {
                        $scope.personalDetails[property] = $scope[property];
                    }
                }
            }
            cfpLoadingBar.start();
            personalDetailsService.storeProfile(cookieData.token, $scope.personalDetails, profileStoreSuccess);
        }
        cfpLoadingBar.start();
        personalDetailsService.fetchProfile(cookieData.token, profileFetchSuccess);
    }

});


