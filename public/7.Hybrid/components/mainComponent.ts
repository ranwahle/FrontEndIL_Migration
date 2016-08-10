/**
 * Created by ranwahle on 06/08/2016.
 */
import "../services/chatService";

 export   class controller {
        private topics:any;
        private topicToAdd:any;

        constructor(private _chatService:any) {
            var self = this;
            _chatService.subscribe('topicListChanged', args => self.loadTopics(args));

        }

        loadTopics(topics) {
            this.topics = [];
            for (let key in topics) {
                this.topics.push(key);
            }
        }

        addTopic() {
            this._chatService.addTopic(this.topicToAdd);
        }
    }

    controller.$inject = ['chatService'];

    angular.module('chatApp.mainComponent',['chatApp.chatService'])
        .component('mainComponent',{
            controller: controller,
            controllerAs: 'mainController',
            template: `<div>
    <div style="float:left;">

    </div>
    <div style="float:left;">
        <ul>
            <li data-ng-repeat="topic in mainController.topics">
                <a href="#/topics/{{topic}}"> {{topic}}</a>
            </li>
        </ul>


        <input type="text" placeholder="Topic Name" data-ng-model="mainController.topicToAdd"/>
        <button data-ng-click="mainController.addTopic()">Add topic</button>
    </div>
    <div style="float: left;">
        <ui-view></ui-view>
    </div>
</div>
`,

        });


