/**
 * Created by tanmay on 20/5/17.
 */
'use strict';

appModule.controller('404Ctrl', function ($scope, $state, loginService, $cookies) {
    var cookieData = $cookies.getObject('cookieData');
    if (cookieData) {
        console.log("404 controller");
        $scope.message = "No Such Page";
    }
});