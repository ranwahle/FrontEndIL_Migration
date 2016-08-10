"use strict";
/**
 * Created by ranwahle on 06/08/2016.
 */
require("../services/ChatService");
var controller = (function () {
    function controller(_chatService) {
        this._chatService = _chatService;
        var self = this;
        _chatService.subscribe('topicListChanged', function (args) { return self.loadTopics(args); });
    }
    controller.prototype.loadTopics = function (topics) {
        this.topics = [];
        for (var key in topics) {
            this.topics.push(key);
        }
    };
    controller.prototype.addTopic = function () {
        this._chatService.addTopic(this.topicToAdd);
    };
    return controller;
}());
exports.controller = controller;
controller.$inject = ['chatService'];
angular.module('chatApp.mainComponent', ['chatApp.chatService'])
    .component('mainComponent', {
    controller: controller,
    controllerAs: 'mainController',
    template: "<div>\n    <div style=\"float:left;\">\n\n    </div>\n    <div style=\"float:left;\">\n        <ul>\n            <li data-ng-repeat=\"topic in mainController.topics\">\n                <a href=\"#/topics/{{topic}}\"> {{topic}}</a>\n            </li>\n        </ul>\n\n\n        <input type=\"text\" placeholder=\"Topic Name\" data-ng-model=\"mainController.topicToAdd\"/>\n        <button data-ng-click=\"mainController.addTopic()\">Add topic</button>\n    </div>\n    <div style=\"float: left;\">\n        <ng-view></ng-view>\n    </div>\n</div>\n"
});
//# sourceMappingURL=mainComponent.js.map