/**
 * Created by tanmay on 4/6/17.
 */
appModule.directive('formDatepicker', function () {
    return {
        restrict: 'E',
        scope: {
            stack: '=',
            roleId: '=',
            date:'=',
            model:'=',
            submitChangedValue: '='
        },
        replace:true,
        templateUrl: 'custom-directives/templates/form-datepicker.tpl.html',
        controller: function ($scope) {
            $scope.popup2 = {
                opened:false
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.dateValChange = function(){
                $scope.model = $scope.date;
                $scope.submitChangedValue($scope.model);
            }
        }
    };
});