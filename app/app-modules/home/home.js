'use strict';


    appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies) {
        var isLoggedIn = $cookies.getObject('cookieData');
        console.log(isLoggedIn);
        $scope.changeLoginStatus(isLoggedIn);
        if(angular.isUndefined(isLoggedIn) || isLoggedIn == null || !isLoggedIn){
            $state.go('login');
        }else{
            $state.go('home.admin');
        }

        $scope.logout = function(){
            $cookies.remove('isLoggedIn');
            $scope.clearLoginStatus();
            $state.go('login');

        }

    });