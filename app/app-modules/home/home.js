'use strict';


    appModule.controller('HomeCtrl', function ($scope, $state, loginService, $cookies) {
        var isLoggedIn = $cookies.getObject('isLoggedIn');
        console.log(isLoggedIn);
        if(angular.isUndefined(isLoggedIn) || isLoggedIn == null || !isLoggedIn){
            $state.go('login');
        }else{
            $state.go('home.admin');
        }

        $scope.logout = function(){
            $cookies.remove('isLoggedIn');
            $state.go('login');
        }

        $scope.active="admin";
    });