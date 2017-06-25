'use strict';

appModule.controller('UserManagementCtrl', function ($filter, $timeout, $scope, $state, $cookies, Notification, AppService, UserManagementService, $parse, cfpLoadingBar, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var rowsPerPage = 10;
        $scope.rowCollection = undefined;
        var data = undefined;
        var tableDataFetchSuccess = function (response) {
            $log.warn("<--Table Data-->")
            $log.info(response);
            if (response.data.success) {
                $scope.currentPage = 1;
                data = response.data.tableData;
                $scope.totalItems = data.length / rowsPerPage * 10;
                var colOrder = response.data.tableDataOrder;
                data = AppService.formatTabularData(data, colOrder);
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
        UserManagementService.fetchHostelData(cookieData.token, tableDataFetchSuccess);

        $scope.pageChanged = function () {
            $scope.rowCollection = angular.copy(data).splice(($scope.currentPage - 1) * rowsPerPage, rowsPerPage);
        };

        var timer = false;
        $scope.$watch('searchVal', function (val) {
            if (timer) {
                $timeout.cancel(timer)
            }
            timer = $timeout(function () {
                if (!angular.isUndefined(val) && val != null && val != '') {
                    $scope.rowCollection = $filter("filter")(angular.copy(data), val);
                    $scope.totalItems = $scope.rowCollection.length / rowsPerPage * 10;
                }
                else {
                    $scope.rowCollection = angular.copy(data).splice(0, rowsPerPage);
                    $scope.totalItems = data.length / rowsPerPage * 10;
                }

            }, 1000);
        });

        $scope.performAction = function (action, row) {
            var userId = UserManagementService.fetchUserIdFromTableRow(row);
            console.log(userId);
            if (angular.isDefined(userId)) {
                switch (action) {
                    case 'e':
                        alert("Edit :" + userId);
                        break;
                    case 'v':
                        alert("View :" + userId);
                        break;
                    default:
                        alert("Remove :" + userId);
                        break;

                }
            }
        }
    }
});
