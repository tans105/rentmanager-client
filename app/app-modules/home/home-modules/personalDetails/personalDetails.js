'use strict';


appModule.controller('PersonalDetailsCtrl', function (NotificationService, $rootScope, $scope, $state, $cookies, personalDetailsService, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.activateModule("personalDetails");
        $scope.roleId = cookieData.roleId;
        var personalDetails = null;
        var statePlaceholder = "Select Native State";
        var idproofPlaceholder = "Select Id proof";


        //Callback for profile fetch
        var profileFetchSuccess = function (response) {
            $rootScope.loading = false;
            $log.warn("<--PROFILE FETCH RESPONSE-->");
            $log.info(response);
            if (response.data.success) {
                personalDetailsService.parseToNumeric(response.data);

                $scope.formSchema = response.data.formSchema;
                personalDetails = response.data.personalDetails;

                angular.forEach($scope.formSchema, function (row) {
                    angular.forEach(row.stack, function (stack) {
                        if (stack.fieldId == 'idproof') {
                            stack.selectList = response.data.idProofMst;
                        }
                        if (stack.fieldId == 'state') {
                            stack.selectList = response.data.stateMst;
                        }
                        for (var key in personalDetails) {
                            if (key == stack.fieldId) {
                                stack.value = personalDetails[key];
                            }
                        }
                    });
                });

            }
            else {
                NotificationService.notify(false, 'Failed to load profile, Login again!', 'top', 'left');
            }
        }

        //Callback for profile update
        var profileStoreSuccess = function (response) {
            $rootScope.loading = false;
            $log.warn("<--PROFILE STORE RESPONSE-->");
            if (angular.isDefined(response) && response.status == 200) {
                if (response.data.success) {
                    NotificationService.notify(true, response.data.responseMsg, 'top', 'left');
                    $log.info(response);
                }
                else {
                    NotificationService.notify(false, response.data.responseMsg, 'top', 'left');
                    $log.info(response);
                }

            } else {
                NotificationService.notify(false, 'Profile Update Failed, Contact Admin!', 'top', 'left');
                $log.info(response);
            }
        }

        $scope.storeInfo = function () {
            angular.forEach($scope.formSchema, function (row) {
                angular.forEach(row.stack, function (stack) {
                    for (var key in personalDetails) {
                        if (stack.value == statePlaceholder) {
                            stack.value = null;
                        }
                        if (stack.value == idproofPlaceholder) {
                            stack.value = null;
                        }
                        if (key == stack.fieldId) {
                            personalDetails[key] = stack.value;
                        }
                    }
                })
            });
            $rootScope.loading = true;
            personalDetailsService.storeProfile(cookieData.token, personalDetails, profileStoreSuccess);
        }


        $rootScope.loading = true;
        personalDetailsService.fetchProfile(cookieData.token, profileFetchSuccess);
    }

});


