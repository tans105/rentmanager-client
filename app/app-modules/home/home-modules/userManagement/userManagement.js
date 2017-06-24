'use strict';

appModule.controller('UserManagementCtrl', function ($scope, $state, $cookies, Notification, userManagementService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var rowsPerPage = 2;
        $scope.rowCollection = undefined;
        // $scope.columnHeaders=["User ID","First Name","Last Name","Joined On","Role","Action"];
        var data = undefined;
        var tableDataFetchSuccess = function (response) {
            $log.warn("<--Table Data-->")
            $log.info(response);
            if (response.data.success) {
                $scope.currentPage = 1;
                data = response.data.tableData;
                $scope.totalItems =data.length/rowsPerPage*10;
                var colOrder = ["user_id","first_name","last_name","joining_date","role"];
                data = userManagementService.formatTabularData(data, colOrder);
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
