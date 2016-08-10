"use strict";
/**
 * Created by ranwahle on 06/08/2016.
 */
require("../services/ChatService");
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
exports.controller = controller;
controller.$inject = ['chatService', '$routeParams', '$scope'];
angular.module('chatApp.chatComponent', ['chatApp.chatService']).component('chatComponent', {
    controller: controller,
    controllerAs: 'chatController',
    template: "<h2>Wellcome to {{chatController.topicName}}</h2>\n\n<ul id=\"messages\">\n    <li data-ng-repeat=\"message in chatController.messages track by $index\">{{message}}</li>\n</ul>\n\n\n<input id=\"m\" autocomplete=\"off\" data-ng-model=\"chatController.messageToSend\" />\n<button data-ng-click=\"chatController.sendMessage()\">Send</button>\n\n<br/>\n"
});
//# sourceMappingURL=ChatComponent.js.map