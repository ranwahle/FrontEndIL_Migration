/**
 * Created by ranwahle on 04/08/2016.
 */
(function (angular) {
    var app = angular.module('chatApp', ['ngRoute', 'chatApp.chatComponent', 'chatApp.mainComponent']);
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/topics/:topicName', {
                templateUrl: 'chat.html'
            });
        }]);
}(window['angular']));
var angular = window['angular'];
angular.element(document).ready(function () {
    angular.bootstrap(document, ['chatApp']);
});
//# sourceMappingURL=app.js.map