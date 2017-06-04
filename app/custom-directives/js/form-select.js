/**
 * Created by tanmay on 4/6/17.
 */
appModule.directive('formSelect', function () {
    return {
        restrict: 'E',
        scope: {
            stack: '=',
            roleId: '=',
            selectList:'=',
            model:'='
        },
        replace:true,
        templateUrl: 'custom-directives/templates/form-select.tpl.html',
    };
});