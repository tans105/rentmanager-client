'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', function($scope,$location,registerService) {
  console.log("register controller reporting on duty");

  var registerSuccess=function(response){
    if(angular.isDefined(response)){
      if(response.data.success=='true'){
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
    console.log(user);
    if(user.password!=user.confirmPassword){
      alert("mismatch");
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