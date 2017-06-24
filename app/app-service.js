/**
 * Created by tanmay on 24/5/17.
 */
'use strict';

appModule.service('AppService', function ($rootScope) {

    var thisRef = this;

    thisRef.generateEvent = function (message, data) {
        $rootScope.$broadcast(message, data);
    }

    this.convertKeyToLabel = function(key){
        return (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ');
    };

    this.formatTabularData = function(data, colOrder){
        var formattedData = [];
        var columnMaping = {};
        if(angular.isDefined(data) && angular.isDefined(data[0])){
            var tempInstance = data[0];
            for(var key in tempInstance){
                if(colOrder.indexOf(key) > -1){
                    columnMaping[key] = {
                        id: key,
                        order: colOrder.indexOf(key),
                        label: thisRef.convertKeyToLabel(key)
                    };
                }
            }
            angular.forEach(data, function(instance){
                var tempData = angular.copy(columnMaping);
                var tempArray = [];
                for(var key in instance){
                    if(angular.isDefined(tempData[key]) && tempData[key].id == key){
                        tempData[key].value = instance[key];
                        tempArray.push(tempData[key]);
                    }
                }
                formattedData.push(angular.copy(tempArray));
            });
        }
        return formattedData;
    }
});