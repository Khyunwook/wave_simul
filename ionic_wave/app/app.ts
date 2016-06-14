import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Data} from './providers/data/data';
import {Connectivity} from './providers/connectivity/connectivity';
import {Bingmap} from './providers/bingmap/bingmap';
import {Wave} from './providers/wave/wave';
import {Node} from './providers/node/node';
import {Selection} from './providers/selection/selection';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Data, Connectivity, Bingmap, Wave, Node, Selection],
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
ionicBootstrap(MyApp);
