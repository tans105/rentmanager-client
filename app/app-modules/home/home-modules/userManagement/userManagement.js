'use strict';

appModule.controller('UserManagementCtrl',['$scope',function($scope){
    $scope.greetings='world';

    var
        nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
        familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

    function createRandomItem() {
        var
            firstName = nameList[Math.floor(Math.random() * 4)],
            lastName = familyName[Math.floor(Math.random() * 4)],
            age = Math.floor(Math.random() * 100),
            email = firstName + lastName + '@whatever.com',
            balance = Math.random() * 3000;

        return{
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            balance: balance
        };
    }

    $scope.rowCollection = [];
    for (var j = 0; j < 400; j++) {
        $scope.rowCollection.push(createRandomItem());
    }

}])
    .directive('stPersist', function () {
        return {
            require: '^stTable',
            link: function (scope, element, attr, ctrl) {
                var nameSpace = attr.stPersist;

                //save the table state every time it changes
                scope.$watch(function () {
                    return ctrl.tableState();
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        localStorage.setItem(nameSpace, JSON.stringify(newValue));
                    }
                }, true);

                //fetch the table state when the directive is loaded
                if (localStorage.getItem(nameSpace)) {
                    var savedState = JSON.parse(localStorage.getItem(nameSpace));
                    var tableState = ctrl.tableState();

                    angular.extend(tableState, savedState);
                    ctrl.pipe();

                }

            }
        };
    });;
