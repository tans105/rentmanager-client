'use strict';

appModule.controller('UserManagementCtrl', function ($rootScope, $filter, $mdDialog, $timeout, $scope, $state, $cookies, NotificationUtil, AppService, UserManagementService, $log) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {

        $scope.moduleTitle = "User Management";
        $scope.headerButton = {
            active: true,
            buttonTransitionState: 'home.userManagement.addUser',
            buttonName: 'Add User'
        };

        /*Table init*/
        $scope.actionsEnabled = undefined;
        $scope.rowCollection = undefined;
        var data = undefined;
        var rowsPerPage = 3;
        $scope.currentPage = 1;
        /************/

        var tableDataFetchSuccess = function (response) {
            $rootScope.loading = false;
            $log.warn("<--Table Data-->")
            $log.info(response);
            if (response.data.success) {
                data = AppService.formatTabularData(response.data.table.tableData, response.data.table.tableDataOrder);
                $scope.actionsEnabled = response.data.table.actionsEnabled;
                $scope.totalItems = data.length / rowsPerPage * 10;
                $scope.rowCollection = angular.copy(data).splice(0, rowsPerPage);
            }
            else {
                NotificationUtil.notify(false, 'Something went wrong, Contact Admin!', 'top', 'left');
            }
        }
        $rootScope.loading = true;
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


        $scope.performAction = function (action, row, event) {
            var userId = UserManagementService.fetchUserIdFromTableRow(row);
            if (angular.isDefined(userId)) {
                switch (action) {
                    case 'e':
                        alert("Edit :" + userId);
                        break;
                    case 'v':
                        alert("View :" + userId);
                        break;
                    default:
                        removeUser(userId, event);
                        break;

                }
            }
        }

        var removeUser = function (userId, event) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure to delete the User?')
                .textContent(userId + ' will be deleted permanently.')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm).then(function () {
                console.log('Record deleted successfully!');
            }, function () {
                console.log('You decided to keep your record.');
            });
        }
    }
});
