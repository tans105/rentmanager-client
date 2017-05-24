/**
 * Created by tanmay on 24/5/17.
 */
'use strict';

appModule.service('loaderService', function($rootScope){

    var that = this;

    that.generateEvent = function(message, data){
        $rootScope.$broadcast(message, data);
    }
});