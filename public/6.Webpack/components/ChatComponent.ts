/**
 * Created by ranwahle on 06/08/2016.
 */
import "../services/ChatService";

   export class controller {

        private messages:any;
        private topicName:string;
        private messageToSend:string;


        constructor(private _chatService:any, private _$routeParams:any, private  _$scope:any) {
            //    _chatService = chatService;
            this.messages = [];

            this.topicName = _$routeParams.topicName;
            let self = this;
            let topicSubscription = message => self.messageReceived.call(self, message);


            _chatService.subscribe('topicListChanged', topics => {
                if (topics[self.topicName]) {
                    _chatService.subscribeToTopic(self.topicName, topicSubscription);
                }
            });

            _chatService.subscribeToTopic(self.topicName, topicSubscription);
        }

        messageReceived(message) {
            this.messages.push(message);
            this._$scope.$applyAsync();
        };

        sendMessage() {
            this._chatService.sendMessage(this.topicName, this.messageToSend);
        };
    }

    controller.$inject = ['chatService', '$routeParams', '$scope'];

    angular.module('chatApp.chatComponent',['chatApp.chatService']).component('chatComponent',{
        controller: controller,
        controllerAs: 'chatController',
       template: `<h2>Wellcome to {{chatController.topicName}}</h2>

<ul id="messages">
    <li data-ng-repeat="message in chatController.messages track by $index">{{message}}</li>
</ul>


<input id="m" autocomplete="off" data-ng-model="chatController.messageToSend" />
<button data-ng-click="chatController.sendMessage()">Send</button>

<br/>
`
    });
