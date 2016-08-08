// /**
//  * Created by ranwahle on 05/08/2016.
//  */
// (function (angular) {
//
//     //var _chatService,
//
//     class controller {
//         private topics: any;
//         private topicToAdd:any;
//         constructor(private _chatService:any) {
//             var self = this;
//             _chatService.subscribe('topicListChanged', args =>  self.loadTopics(args));
//
//         }
//
//         loadTopics(topics) {
//             this.topics = [];
//             for (let key in topics) {
//                 this.topics.push(key);
//             }
//         }
//
//         addTopic() {
//             this._chatService.addTopic(this.topicToAdd);
//         }
//     }
//
//
//     // controller.prototype.loadTopics = function(topics){
//     //     this.topics = [];
//     //     for (var key in topics){
//     //         this.topics.push(key);
//     //     }
//     // };
//
//     // controller.prototype.addTopic = function () {
//     //     _chatService.addTopic(this.topicToAdd);
//     // };
//
//     angular.module('chatApp.mainController', ['chatApp.chatService'])
//         .controller('mainController', ['chatService', controller]);
//
// }(window['angular'])); 
//# sourceMappingURL=mainController.js.map