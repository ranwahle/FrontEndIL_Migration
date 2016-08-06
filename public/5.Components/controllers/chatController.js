/**
 * Created by ranwahle on 04/08/2016.
 */
(function (angular) {
    //var _chatService, _eventSubscription, _$scope;
    var controller = (function () {
        function controller(_chatService, _$routeParams, _$scope) {
            this._chatService = _chatService;
            this._$routeParams = _$routeParams;
            this._$scope = _$scope;
            //    _chatService = chatService;
            this.messages = [];
            this.topicName = _$routeParams.topicName;
            var self = this;
            var topicSubscription = function (message) { return self.messageReceived.call(self, message); };
            _chatService.subscribe('topicListChanged', function (topics) {
                if (topics[self.topicName]) {
                    _chatService.subscribeToTopic(self.topicName, topicSubscription);
                }
            });
            _chatService.subscribeToTopic(self.topicName, topicSubscription);
        }
        controller.prototype.messageReceived = function (message) {
            this.messages.push(message);
            this._$scope.$applyAsync();
        };
        ;
        controller.prototype.sendMessage = function () {
            this._chatService.sendMessage(this.topicName, this.messageToSend);
        };
        ;
        return controller;
    }());
    // controller.prototype.messageReceived = function(message){
    //     this.messages.push(message);
    //     _$scope.$applyAsync();
    // };
    // controller.prototype.sendMessage = function(){
    //     _chatService.sendMessage(this.topicName,  this.messageToSend);
    // };
    angular.module('chatApp.chatController', ['chatApp.chatService', 'ngRoute'])
        .controller('chatController', ['chatService', '$routeParams', '$scope', controller]);
}(window['angular']));
//# sourceMappingURL=chatController.js.map