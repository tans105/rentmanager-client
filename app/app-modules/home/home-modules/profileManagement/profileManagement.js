'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, personalDetailsService, $parse, cfpLoadingBar) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "Profile Management";
        $scope.activateModule("profileManagement");

        var profileFetchSuccess = function (response) {
            cfpLoadingBar.complete();
            console.log(response);
            if (response.data.success) {

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
            console.log($scope)
            $scope.dob=new Date($scope.dob);
            $scope.dt1=$scope.dob;

        }
        var profileStoreSuccess = function (response) {
            cfpLoadingBar.complete();
            console.log(response);
        }
        $scope.storeInfo = function () {
            console.log($scope.dob);
            console.log($scope.dt1);

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


