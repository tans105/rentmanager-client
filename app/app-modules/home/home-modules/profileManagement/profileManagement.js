'use strict';


appModule.controller('ProfileManagementCtrl', function ($scope, $state, $cookies, Notification, personalDetailsService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var statePlaceholder = "Select Native State";
        var idproofPlaceholder = "Select Id proof";
        $scope.activateModule("profileManagement");
        $scope.roleId = cookieData.roleId;

        //Callback for profile fetch
        var profileFetchSuccess = function (response) {
            cfpLoadingBar.complete();
            $log.warn("<--PROFILE FETCH RESPONSE-->");
            $log.info(response);
            if (response.data.success) {
                personalDetailsService.parseToNumeric(response.data);

                $scope.formSchema = response.data.formSchema;
                $scope.personalDetails = response.data.personalDetails;
                $scope.selectList33 = response.data.stateMst;
                $scope.selectList21 = response.data.idProofMst;
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
                if ($scope.state == null)
                    $scope.state = statePlaceholder;
                if ($scope.idproof == null)
                    $scope.idproof = idproofPlaceholder;
                //Casting String date to Date Object for datepicker//
                $scope.dob = new Date($scope.dob);
                $scope.dt1 = $scope.dob;
            }
            else {
                Notification.error({
                    message: 'Failed to load profile, Login again!',
                    positionY: 'top',
                    positionX: 'left'
                });
            }
        }

        //Callback for profile update
        var profileStoreSuccess = function (response) {
            cfpLoadingBar.complete();
            if ($scope.state == null) {
                $scope.state = statePlaceholder;
            }
            if ($scope.idproof == idproofPlaceholder)
                $scope.idproof = null;
            $log.warn("<--PROFILE STORE RESPONSE-->");
            if (angular.isDefined(response) && response.status == 200) {
                if (response.data.success) {
                    Notification.success({message: response.data.responseMsg, positionY: 'top', positionX: 'left'});
                    $log.info(response);
                }
                else {
                    Notification.error({message: response.data.responseMsg, positionY: 'top', positionX: 'left'});
                    $log.info(response);
                }

            } else {
                Notification.error({
                    message: 'Profile Update Failed, Contact Admin!',
                    positionY: 'top',
                    positionX: 'left'
                });
                $log.info(response);
            }
        }


        $scope.storeInfo = function () {
            if ($scope.state == statePlaceholder) {
                $scope.state = null;
            }
            if ($scope.idproof == idproofPlaceholder)
                $scope.idproof = null;
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


