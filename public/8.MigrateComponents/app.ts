/**
 /* Created by ranwahle on 04/08/2016.
 */
import "./components/ChatComponent";
//import "./components/mainComponent";
import "../styles/main.css";




let app = angular.module('chatApp', ['ngRoute', 'chatApp.chatComponent',
    'chatApp.mainComponent']);


app.config(['$routeProvider', function ($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when( '/topics/:topicName',{
        template : '<chat-component></chat-component>'
        //controller: 'chatController',
        //controllerAs: 'chatController'
    });

}]);
// angular.bootstrap(document, ['chatApp'],{
//     strictDi: true
// });

// angular.element(document).ready(function () {
//     angular.bootstrap(document, ['chatApp']);
// });