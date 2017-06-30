/**
 * Created by tanmay on 6/6/17.
 */
appModule.directive("mandatory", function () {
    return {
        restrict: 'A',
        compile: function (element) {
            element.text(element.text() + "*");
        }
    };
});