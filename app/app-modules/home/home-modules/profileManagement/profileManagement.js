'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, Notification, personalDetailsService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var statePlaceholder = "Select Native State";
        $scope.activateModule("profileManagement");
        $scope.roleId = cookieData.roleId;

        var stateFetchSuccess = function (response) {
            if (angular.isDefined(response)) {
                $scope.selectList = response.data.state;
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
                personalDetailsService.parseToNumeric(response.data);

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
            if ($scope.state == null)
                $scope.state = statePlaceholder;
            //Casting String date to Date Object for datepicker//
            $scope.dob = new Date($scope.dob);
            $scope.dt1 = $scope.dob;
            //--------------------------------------------------//

        }
        var profileStoreSuccess = function (response) {
            cfpLoadingBar.complete();
            if ($scope.state == null) {
                $scope.state = statePlaceholder;
            }
            $log.warn("<--PROFILE STORE RESPONSE-->");
            if (angular.isDefined(response) && response.status == 200) {
                Notification.success({message: 'Profile Updated Successfully', positionY: 'top', positionX: 'left'});
                $log.info(response);
            }else{
                Notification.error({message: 'Profile Update Failed', positionY: 'top', positionX: 'left'});
                $log.info(response);
            }
        }
        $scope.storeInfo = function () {
            if ($scope.state == statePlaceholder) {
                $scope.state = null;
            }
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


