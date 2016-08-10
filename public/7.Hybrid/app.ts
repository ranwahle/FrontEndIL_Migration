/**
 /* Created by ranwahle on 04/08/2016.
 */
import "./components/ChatComponent";
import "./components/mainComponent";
import "../styles/main.css";
//import "angular-route/angular-route.js";
import "angular-ui-router";


import "angular";



var app = angular.module('chatApp', ['ui.router', 'chatApp.chatComponent',
    'chatApp.mainComponent']);

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('topic', {url: '/topics/:topicName',
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