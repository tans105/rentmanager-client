'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app-modules/register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', function($scope,$location,registerService) {
  console.log("register controller reporting on duty");
  $scope.hasError=false;
  var registerSuccess=function(response){
    if(angular.isDefined(response)){
      console.log(response);
      if(response.data.success){
        $location.path('#/login');
      }
      else{
        alert(response.data.message);
      }

    }
    else{
      alert("Failure");
    }
  }
  $scope.register=function(user){
    if(typeof user =='undefined'){
      $scope.hasError=true;
      $scope.errorMsg='All Fields are mandatory'
    }
    else if(typeof user.email=='undefined' || typeof user.password=='undefined' || typeof user.confirmPassword=='undefined'){
      $scope.hasError=true;
      $scope.errorMsg='All Fields are mandatory'
    }
    else if(user.password!=user.confirmPassword){
      $scope.hasError=true;
      $scope.errorMsg='Password should match with confirm Password';
    }
    else{
      registerService.registerUser(user.email,user.password,registerSuccess);
    }
  }

})

.service('registerService',function($http){
  this.registerUser = function(email, pwd, callback){
    $http({
      url: "http://localhost:3000/register",
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