'use strict';


appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        var currentLocation = $state.current.name;
        if (angular.isUndefined(currentLocation)) {
            $scope.selectedModule = cookieData.moduleList[0];
        }

        $scope.changeLoginStatus(cookieData);
        $scope.moduleList = cookieData.moduleList;

        $scope.activateModule = function (moduleName) {
            angular.forEach($scope.moduleList, function (module) {
                if (module.moduleLink == $scope.moduleName) {
                    $scope.selectedModule = module;
                }
            });
        };

        angular.forEach($scope.moduleList, function (module) {
            if (module.moduleLink == currentLocation) {
                console.log(module);
                $scope.selectedModule = module;
                $state.go(module.moduleLink);
            }
        });

        $scope.checkForChildStates = function (module) {
            var isActive = false;
            if (module.moduleLink == 'home.userManagement.details' && $state.current.name == 'home.userManagement.addUser') {
                isActive = true;
            }
            if (isActive) {
                return "active";
            } else {
                return false;
            }
        }

    }

});