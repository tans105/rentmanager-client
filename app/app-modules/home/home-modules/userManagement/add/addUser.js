/**
 * Created by tanmay on 6/6/17.
 */
'use strict';

appModule.controller('AddUserCtrl', function ($scope, $state, userManagementService, $cookies, Notification, cfpLoadingBar, $parse, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.roleId = cookieData.roleId;
        var statePlaceholder = "Select Native State";
        var idproofPlaceholder = "Select Id proof";


        console.log("controller reporting");
        var templateFetchSuccess = function (response) {
            cfpLoadingBar.complete();
            $log.warn("<--NEW USER FETCH RESPONSE-->");
            $log.info(response);
            if (response.data.success) {
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
        cfpLoadingBar.start();
        userManagementService.fetchTemplate(cookieData.token, templateFetchSuccess);


        var userAddSuccess=function(response){
            console.log(response);
        }

        $scope.addUser = function () {
            console.log("Adding");
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
            userManagementService.addUser(cookieData.token, $scope.personalDetails, 1,  userAddSuccess);
        }
    }
});