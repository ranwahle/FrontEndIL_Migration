/**
 * Created by ranwahle on 04/08/2016.
 * **/
 require(['socketIo'],
    function(io){


     class service {
        private _socket:any;
        private _topics:any = {};
        private _events:any = {};
        private _messages:any = [];

        get topics():any {
            return this._topics;
        }

        constructor() {
            this._socket = io();

            let self = this;
            this._socket.on('chat message', message =>  self.messageReceived.call(self, message));
            this._socket.on('topics', topics => {
                self.topicsLoaded.call(self, topics);
            });
            this._socket.on('previousMessages',  (messages) => {
                messages.forEach(message =>
                    self.messageReceived.call(self, message)
                );
            });
            // Object.defineProperty(this,'topics',{
            //     get: function() {return _topics}
            // });
        }

        topicsLoaded = function (topics) {
            this._topics = {};
            let self = this;
            topics.forEach(function (topic) {
                self._topics[topic] = [];
            });
            this.runEvents('topicListChanged', this._topics);
        }

        messageReceived(message) {
            this._messages.push(message);
            var topic = this._topics[message.topic];
            if (!topic) {
                return;
            }
            topic.forEach(callback =>
                callback(message.message)
            );
        }

        sendMessage(topicName, message) {
            this._socket.emit('chat message', {topic: topicName, message: message});
        }

        subscribe(eventName, callback) {
            if (!this._events[eventName]) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(callback);

        }

        subscribeToTopic(topic, callback) {
            if (!this._topics[topic]) {
                return;
            }
            this._topics[topic].push(callback);

            var topicMessages = this._messages.filter(function (message) {
                return message.topic === topic;
            });

            topicMessages.forEach(message => callback(message.message));

        }

        runEvents(eventName, args) {
            if (!this._events[eventName]) {
                return;
            }
            this._events[eventName].forEach(callback => callback(args));

        }

        addTopic(topic) {
            if (this._topics[topic]) {
                return;
            }
            this._topics[topic] = [];
            this._socket.emit('newTopic', topic);
            this.runEvents('topicListChanged', this._topics);
        }
    }




    angular.module('chatApp.chatService', []).service('chatService', [service]);

});