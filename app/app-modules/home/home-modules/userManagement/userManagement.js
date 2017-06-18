'use strict';

appModule.controller('UserManagementCtrl', function ($scope, $state, $cookies, Notification, userManagementService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var rowsPerPage = 2;
        $scope.rowCollection = null;
        $scope.columnHeaders=["User ID","First Name","Last Name","Joined On","Role","Action"];
        var data = null;
        var tableDataFetchSuccess = function (response) {
            $log.warn("<--Table Data-->")
            $log.info(response);
            if (response.data.success) {
                $scope.currentPage = 1;
                //3
                data = response.data.tableData;
                $scope.totalItems =data.length/rowsPerPage*10;
                $scope.rowCollection = angular.copy(data).splice(0, rowsPerPage);
            }
            else {
                Notification.error({
                    message: 'Something went wrong, Contact Admin!',
                    positionY: 'top',
                    positionX: 'left'
                });
            }
        }
        userManagementService.fetchHostelData(cookieData.token, tableDataFetchSuccess);

        $scope.pageChanged = function () {
            $scope.rowCollection = angular.copy(data).splice(($scope.currentPage - 1) * rowsPerPage, rowsPerPage);
        };


    }
});
