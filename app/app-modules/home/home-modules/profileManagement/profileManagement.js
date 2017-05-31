'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, personalDetailsService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.activateModule("profileManagement");
        $scope.roleId = cookieData.roleId;

        var stateFetchSuccess = function (response) {
            if (angular.isDefined(response)) {
                $scope.stateList = response.data.stateList;
            }
            else {
                $log.error("Failed to fetch State List");
            }
        }

        personalDetailsService.fetchStateList(stateFetchSuccess);


        var profileFetchSuccess = function (response) {
            cfpLoadingBar.complete();
            $log.warn("<--PROFILE FETCH RESPONSE-->");
            $log.info(response);
            if (response.data.success) {

                $scope.formSchema = response.data.formSchema;
                $scope.personalDetails = response.data.personalDetails;
                console.log($scope.formSchema);

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
            //Casting String date to Date Object for datepicker//
            $scope.dob = new Date($scope.dob);
            $scope.dt1 = $scope.dob;
            //--------------------------------------------------//

        }
        var profileStoreSuccess = function (response) {
            cfpLoadingBar.complete();
            $log.warn("<--PROFILE STORE RESPONSE-->");
            $log.info(response);
        }
        $scope.storeInfo = function () {
            console.log($scope.dob);
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


