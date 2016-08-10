/**
 * Created by ranwahle on 09/08/2016.
 */
import "angular";
import "angular-route/angular-route.js";
import "angular-ui-router";



//import "angular";
//import "angular-route/angular-route.js";
import { UpgradeAdapter } from '@angular/upgrade';

import './app';
import {ChatService} from "./services/chatService";
import {MainComponent} from "./components/mainComponent";
import {ChatComponent} from "./components/ChatComponent";

let upgradeAdapter = new UpgradeAdapter();
upgradeAdapter.upgradeNg1Provider('$routeParams');

upgradeAdapter.addProvider(ChatService);


angular.module('chatApp.chatService',[])
    .service('chatService', upgradeAdapter.downgradeNg2Provider(ChatService));
angular.module('chatApp.mainComponent',[])
    .directive(
        'mainComponent',
        <angular.IDirectiveFactory>
            upgradeAdapter.downgradeNg2Component(MainComponent)
    );


angular.module('chatApp.chatComponent',[])
    .directive(
        'chatComponent',
        <angular.IDirectiveFactory>
            upgradeAdapter.downgradeNg2Component(ChatComponent)
    );





upgradeAdapter.bootstrap(document.documentElement, ['chatApp']);
