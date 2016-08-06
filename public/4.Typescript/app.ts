/**
 * Created by ranwahle on 04/08/2016.
 */


(function(angular){

    var app = angular.module('chatApp',['ngRoute','chatApp.chatController', 'chatApp.mainController']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/topics/:topicName',{
           templateUrl: 'chat.html',
            controller: 'chatController',
            controllerAs: 'chatController'
        });
    }]);

}(window['angular']));
let angular  = window['angular'];
angular.element(document).ready(function(){
    angular.bootstrap(document, ['chatApp']);
});