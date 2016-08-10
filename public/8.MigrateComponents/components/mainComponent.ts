/**
 * Created by ranwahle on 06/08/2016.
 */
import "angular-route/angular-route.js";
import {Component} from "@angular/core";
import {ChatService} from "../services/chatService";
import {ChatComponent} from "./ChatComponent";
import "angular-route";

@Component({
    selector: 'main-component',
    directives: [ChatComponent],
    template:`
        <ul>
            <li *ngFor="let topic of topics">
                <a href="#/topics/{{topic}}"> {{topic}}</a>
            </li>
        </ul>


        <input type="text" placeholder="Topic Name"  [value]="topicToAdd" (change)="changeTopic($event)"/>
        <button (click)="addTopic()">Add topic</button>
    
`


})
 export   class MainComponent {
        private topics:any;
        private topicToAdd:any;

        constructor(private _chatService:ChatService) {
            var self = this;
            this._chatService.subscribe('topicListChanged', args => self.loadTopics(args));

            this.topicToAdd = '';

        }

        loadTopics(topics) {
            this.topics = [];
            for (let key in topics) {
                this.topics.push(key);
            }
        }

        changeTopic(event){
            console.log(event);
            this.topicToAdd = event.target.value;
        }
        addTopic() {
            this._chatService.addTopic(this.topicToAdd);
        }
    }



   // controller.$inject = ['chatService'];

//     angular.module('chatApp.mainComponent',['chatApp.chatService'])
//         .component('mainComponent',{
//             controller: controller,
//             controllerAs: 'mainController',
//             template: `<div>
//     <div style="float:left;">
//
//     </div>
//     <div style="float:left;">
//         <ul>
//             <li data-ng-repeat="topic in mainController.topics">
//                 <a href="#/topics/{{topic}}"> {{topic}}</a>
//             </li>
//         </ul>
//
//
//         <input type="text" placeholder="Topic Name" data-ng-model="mainController.topicToAdd"/>
//         <button data-ng-click="mainController.addTopic()">Add topic</button>
//     </div>
//     <div style="float: left;">
//         <ui-view></ui-view>
//     </div>
// </div>
// `,
//
//         });


