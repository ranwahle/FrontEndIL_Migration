/**
 * Created by ranwahle on 04/08/2016.
 */
define(['socketIo'], function(io){
    var _socket, _topics = {}, _events = {}, _messages = [];
    var service = function(){
        _socket = io();

        var self = this;
        _socket.on('chat message', self.messageReceived);
        _socket.on('topics',function(topics) { self.topicsLoaded.call(self, topics);});
        _socket.on('previousMessages', function(messages){
            messages.forEach(function(message){
                self.messageReceived(message);
            })
        });
        Object.defineProperty(this,'topics',{
            get: function() {return _topics}
        });

    };

    service.prototype.topicsLoaded = function(topics){
        _topics = {};
        topics.forEach (function( topic){
            _topics[topic] = [];
        });
        this.runEvents('topicListChanged', _topics);
    };

    service.prototype.messageReceived =  function(message){
        _messages.push(message);
        var topic = _topics[message.topic];
        if (!topic){
            // _topics[message.topic] = [];
            return;
        }
        topic.forEach(function(callback){
            callback(message.message);
        });
    };

    service.prototype.sendMessage = function(topicName, message){
        _socket.emit('chat message',{topic: topicName, message:  message});
    };

    service.prototype.subscribe = function(eventName, callback){
        if (!_events[eventName]){
            _events[eventName] = [];
        }
        _events[eventName].push(callback);

    };

    service.prototype.subscribeToTopic = function(topic, callback){
        if (!_topics[topic]){
            return;
        }
        _topics[topic].push(callback);

        var topicMessages = _messages.filter(function(message){
            return message.topic === topic;
        });

        topicMessages.forEach(function(message){
            callback(message.message);
        });

    };

    service.prototype.runEvents = function(eventName, args){
        if (!_events[eventName]){
            return;
        }
        _events[eventName].forEach(function(callback){
            callback(args);
        });
    };

    service.prototype.addTopic = function(topic){
        if (_topics[topic]){
            return;
        }
        _topics[topic] = [];
        _socket.emit('newTopic', topic);
        this.runEvents('topicListChanged', _topics);
    };



    angular.module('chatApp.chatService',[]).service('chatService',[service]);
});

// function(angular){
//
//     var _socket, _topics = {}, _events = {}, _messages = [];
//     var service = function(){
//          _socket = io();
//
//         var self = this;
//         _socket.on('chat message', self.messageReceived);
//         _socket.on('topics',function(topics) { self.topicsLoaded.call(self, topics);});
//         _socket.on('previousMessages', function(messages){
//             messages.forEach(function(message){
//                 self.messageReceived(message);
//             })
//         });
//         Object.defineProperty(this,'topics',{
//             get: function() {return _topics}
//         });
//
//     };
//
//     service.prototype.topicsLoaded = function(topics){
//         _topics = {};
//         topics.forEach (function( topic){
//            _topics[topic] = [];
//         });
//         this.runEvents('topicListChanged', _topics);
//     };
//
//     service.prototype.messageReceived =  function(message){
//         _messages.push(message);
//       var topic = _topics[message.topic];
//       if (!topic){
//          // _topics[message.topic] = [];
//           return;
//       }
//         topic.forEach(function(callback){
//            callback(message.message);
//         });
//     };
//
//     service.prototype.sendMessage = function(topicName, message){
//         _socket.emit('chat message',{topic: topicName, message:  message});
//     };
//
//     service.prototype.subscribe = function(eventName, callback){
//         if (!_events[eventName]){
//            _events[eventName] = [];
//         }
//         _events[eventName].push(callback);
//
//     };
//
//     service.prototype.subscribeToTopic = function(topic, callback){
//         if (!_topics[topic]){
//             return;
//         }
//         _topics[topic].push(callback);
//
//         var topicMessages = _messages.filter(function(message){
//             return message.topic === topic;
//         });
//
//         topicMessages.forEach(function(message){
//             callback(message.message);
//         });
//
//     };
//
//     service.prototype.runEvents = function(eventName, args){
//       if (!_events[eventName]){
//           return;
//       }
//       _events[eventName].forEach(function(callback){
//           callback(args);
//       });
//     };
//
//     service.prototype.addTopic = function(topic){
//         if (_topics[topic]){
//             return;
//         }
//         _topics[topic] = [];
//         _socket.emit('newTopic', topic);
//         this.runEvents('topicListChanged', _topics);
//     };
//
//
//
//     angular.module('chatApp.chatService',[]).service('chatService',[service]);
//
// }(window.angular));