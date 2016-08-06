/**
 * Created by ranwahle on 05/08/2016.
 */
(function(angular){

    var _chatService,
     controller = function(chatService){
         _chatService = chatService;
         var self = this;
         _chatService.subscribe('topicListChanged',function(args)
         {
             self.loadTopics(args);
         });

    };

    controller.prototype.loadTopics = function(topics){
        this.topics = [];
        for (var key in topics){
            this.topics.push(key);
        }
    };

    controller.prototype.addTopic = function(){
        _chatService.addTopic(this.topicToAdd);
    };

    angular.module('chatApp.mainController',['chatApp.chatService'])
        .controller('mainController', ['chatService',controller]);

}(window.angular));