'use strict';

appModule.controller('UserManagementCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        $scope.message = "User Management page";
        $scope.activateModule("userManagement");
        $scope.users = [
            { 'userName':'Tanmay Awasthi',
                'userId': 'TA001',
                'role': 'Admin'},
            { 'userName':'Manisha Ojha',
                'userId': 'MO001',
                'role': 'Admin'},
            { 'userName':'Pushkar Dwivedi',
                'userId': 'PD002',
                'role': 'Tenant'},
            { 'userName':'Daxil Shah',
                'userId': 'DS002',
                'role': 'Tenant'},
            { 'userName':'Nishit Suthar',
                'userId': 'NS002',
                'role': 'Tenant'},
        ];
        $scope.addRow = function(){
            $scope.users.push({ 'userName':$scope.userName, 'userId': $scope.userId, 'role':$scope.role });
            $scope.userName='';
            $scope.userId='';
            $scope.role='';
        };
        $scope.removeRow = function(name){
            var index = -1;
            var comArr = eval( $scope.users );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].name === name ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Something gone wrong" );
            }
            $scope.users.splice( index, 1 );
        };

    }
});