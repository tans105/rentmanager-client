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
            model:'='
        },
        replace:true,
        templateUrl: 'custom-directives/templates/form-datepicker.tpl.html',
    };
});