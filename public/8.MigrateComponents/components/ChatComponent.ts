/**
 * Created by ranwahle on 06/08/2016.
 */

import {ChatService} from "../services/chatService";
import {Component} from "@angular/core";
import {Inject} from "@angular/core";

@Component({
    selector:'chat-component',
        template: `<h2>Wellcome to {{topicName}}</h2>

<ul id="messages">
<li *ngFor="let message of messages ">{{message}}</li>
</ul>


<input id="m" autocomplete="off" [value]="messageToSend" (change)="messageChanged($event)"/>
<button (click)="sendMessage()">Send</button>

    <br/>
    `
})
   export class ChatComponent {

        private messages:any;
        private topicName:string;
        private messageToSend:string;


        constructor(@Inject('$routeParams') $routeParams: angular.route.IRouteParamsService,
                    private _chatService:ChatService) {
            console.log($routeParams);
            //    _chatService = chatService;
            //
            this.topicName = $routeParams['topicName'];
            console.log('chat component contructor');
            this.messages = [];
            this.messageToSend = '';

            let self = this;
            let topicSubscription = message => self.messageReceived.call(self, message);


            this._chatService.subscribe('topicListChanged', topics => {
                if (topics[self.topicName]) {
                    _chatService.subscribeToTopic(self.topicName, topicSubscription);
                }
            });

            this._chatService.subscribeToTopic(self.topicName, topicSubscription);
        }

        messageChanged(event){
            this.messageToSend = event.target.value;
        }

        messageReceived(message) {
            this.messages.push(message);
            //this._$scope.$applyAsync();
        };

        sendMessage() {
            this._chatService.sendMessage(this.topicName, this.messageToSend);
        };
    }

    //controller.$inject = ['chatService', '$stateParams', '$scope'];

    // angular.module('chatApp.chatComponent',['chatApp.chatService','ui.router']).component('chatComponent',{
    //     controller: controller,
    //     controllerAs: 'chatController',
    //    template: `<
    // });
