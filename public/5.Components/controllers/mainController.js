/**
 * Created by ranwahle on 05/08/2016.
 */
(function (angular) {
    //var _chatService,
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
    // controller.prototype.loadTopics = function(topics){
    //     this.topics = [];
    //     for (var key in topics){
    //         this.topics.push(key);
    //     }
    // };
    // controller.prototype.addTopic = function () {
    //     _chatService.addTopic(this.topicToAdd);
    // };
    angular.module('chatApp.mainController', ['chatApp.chatService'])
        .controller('mainController', ['chatService', controller]);
}(window['angular']));
//# sourceMappingURL=mainController.js.map