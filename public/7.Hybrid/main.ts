/**
 * Created by ranwahle on 09/08/2016.
 */
import "angular";
import { UpgradeAdapter } from '@angular/upgrade';

import './app';
import {ChatService} from "./services/chatService";

let upgradeAdapter = new UpgradeAdapter();

upgradeAdapter.addProvider(ChatService);

angular.module('chatApp.chatService',[])
    .service('chatService', upgradeAdapter.downgradeNg2Provider(ChatService));


upgradeAdapter.bootstrap(document.documentElement, ['chatApp']);
