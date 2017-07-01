/**
 * Created by tanmay on 1/7/17.
 */
appModule.directive('validationPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs['validationPassword'], function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('validationPassword', errorMsg ? false : true);
            });
        }
    };
});