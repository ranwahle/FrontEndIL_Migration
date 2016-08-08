/**
 * Created by ranwahle on 06/08/2016.
 */
require.config({
    baseUrl: '.',
    paths:{
        app: 'app',
        chatComponent: 'components/ChatComponent',
        mainComponent: 'components/mainComponent',
        chatService: 'services/chatService',
        angular: '/angular/angular',
        socketIo: '/socket.io/socket.io',
        'socket.io': '/socket.io/socket.io',
        ngRoute: '/angular-route/angular-route.min'

    },

    shim:{
        angular: {
          exports: 'angular'
        },
        ngRoute:{
            exports: 'ngRoute',
            deps: ['angular']
        },
        socketIo: {
          exports: 'io'
        },
        chatService:{
            exports: 'chatService',
            deps: ['socketIo','angular']
        },
        chatComponent: {
            exports: 'chatComponent',
            deps: ['chatService', 'angular']
        },
        mainComponent: {
            exports: 'mainComponent',
            deps: ['chatService', 'angular','ngRoute']
        },
        app:{
            exports: 'app',
            deps: ['mainComponent', 'chatComponent','angular']
        }

    }
});

 define(['app'], function(app){

 });