/**
 * Created by ranwahle on 04/08/2016.
 */
require(['socketIo'], function (io) {
    var service = (function () {
        function service() {
            this._topics = {};
            this._events = {};
            this._messages = [];
            this.topicsLoaded = function (topics) {
                this._topics = {};
                var self = this;
                topics.forEach(function (topic) {
                    self._topics[topic] = [];
                });
                this.runEvents('topicListChanged', this._topics);
            };
            this._socket = io();
            var self = this;
            this._socket.on('chat message', function (message) { return self.messageReceived.call(self, message); });
            this._socket.on('topics', function (topics) {
                self.topicsLoaded.call(self, topics);
            });
            this._socket.on('previousMessages', function (messages) {
                messages.forEach(function (message) {
                    return self.messageReceived.call(self, message);
                });
            });
            // Object.defineProperty(this,'topics',{
            //     get: function() {return _topics}
            // });
        }
        Object.defineProperty(service.prototype, "topics", {
            get: function () {
                return this._topics;
            },
            enumerable: true,
            configurable: true
        });
        service.prototype.messageReceived = function (message) {
            this._messages.push(message);
            var topic = this._topics[message.topic];
            if (!topic) {
                return;
            }
            topic.forEach(function (callback) {
                return callback(message.message);
            });
        };
        service.prototype.sendMessage = function (topicName, message) {
            this._socket.emit('chat message', { topic: topicName, message: message });
        };
        service.prototype.subscribe = function (eventName, callback) {
            if (!this._events[eventName]) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(callback);
        };
        service.prototype.subscribeToTopic = function (topic, callback) {
            if (!this._topics[topic]) {
                return;
            }
            this._topics[topic].push(callback);
            var topicMessages = this._messages.filter(function (message) {
                return message.topic === topic;
            });
            topicMessages.forEach(function (message) { return callback(message.message); });
        };
        service.prototype.runEvents = function (eventName, args) {
            if (!this._events[eventName]) {
                return;
            }
            this._events[eventName].forEach(function (callback) { return callback(args); });
        };
        service.prototype.addTopic = function (topic) {
            if (this._topics[topic]) {
                return;
            }
            this._topics[topic] = [];
            this._socket.emit('newTopic', topic);
            this.runEvents('topicListChanged', this._topics);
        };
        return service;
    }());
    angular.module('chatApp.chatService', []).service('chatService', [service]);
});
//# sourceMappingURL=chatService.js.map