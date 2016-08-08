// /**
//  * Created by ranwahle on 04/08/2016.
//  */
// (function (angular) {
//
//     //var _chatService, _eventSubscription, _$scope;
//
//     class controller {
//
//         private messages:any;
//         private topicName:string;
//         private messageToSend:string;
//
//
//         constructor(private _chatService:any, private _$routeParams:any, private  _$scope:any) {
//             //    _chatService = chatService;
//             this.messages = [];
//
//             this.topicName = _$routeParams.topicName;
//             let self = this;
//             let topicSubscription = message => self.messageReceived.call(self, message);
//
//
//             _chatService.subscribe('topicListChanged', topics => {
//                 if (topics[self.topicName]) {
//                     _chatService.subscribeToTopic(self.topicName, topicSubscription);
//                 }
//             });
//
//             _chatService.subscribeToTopic(self.topicName, topicSubscription);
//         }
//
//         messageReceived(message) {
//             this.messages.push(message);
//             this._$scope.$applyAsync();
//         };
//
//         sendMessage() {
//             this._chatService.sendMessage(this.topicName, this.messageToSend);
//         };
//     }
//
//
//     // controller.prototype.messageReceived = function(message){
//     //     this.messages.push(message);
//     //     _$scope.$applyAsync();
//     // };
//
//     // controller.prototype.sendMessage = function(){
//     //     _chatService.sendMessage(this.topicName,  this.messageToSend);
//     // };
//
//
//     angular.module('chatApp.chatController', ['chatApp.chatService', 'ngRoute'])
//         .controller('chatController', ['chatService', '$routeParams', '$scope', controller]);
// }(window['angular'])); 
//# sourceMappingURL=chatController.js.map