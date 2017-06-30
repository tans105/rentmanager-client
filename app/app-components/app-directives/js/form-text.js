/**
 * Created by tanmay on 1/6/17.
 */
appModule.directive('formText', function () {
    return {
        restrict: 'E',
        scope: {
            stack: '=',
            roleId: '=',
            model:'='
        },
        replace:true,
        templateUrl: 'app-components/app-directives/templates/form-text.tpl.html',
    };
});