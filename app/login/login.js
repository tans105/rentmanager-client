'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      });
    }])

    .controller('LoginCtrl', function($scope, $location, loginService) {
      console.log("Login controller reporting on duty");

      var loginSuccess = function(data){
        console.log("Login response :"+data);
        if(angular.isDefined(data)){
          alert("Successful Login");

          // $cookies.set("tokenId", data.token);
        }
      };

      $scope.login=function(user){
        loginService.loginValidation(user.email, user.password, loginSuccess)
      }
      $scope.inputType="password";
      $scope.hideShowPassword = function(){
        if ($scope.inputType == 'password')
          $scope.inputType = 'text';
        else
          $scope.inputType = 'password';
      };

    })

    .service('loginService', function($http){

      this.loginValidation = function(email, pwd, callback){
        $http({
          url: "http://localhost:3000/api/authenticate",
          method: "POST",
          data: { 'email' : email, 'password': pwd }
        })
            .then(function(response) {
                  callback(response);
                },
                function(response) {
                  callback();
                });

      };

    });