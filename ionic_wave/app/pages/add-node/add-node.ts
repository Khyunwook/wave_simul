import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {ElementRef, ViewChild} from '@angular/core';
import {Bingmap} from '../../providers/bingmap/bingmap';
import {Node} from '../../providers/node/node';
import {Wave} from '../../providers/wave/wave';
/*
  Generated class for the AddNodePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/add-node/add-node.html',
  providers: [Bingmap]
})
export class AddNodePage {
  mycarNumber : number;
  startP : any;
  endP : any;
  time : any;

  @ViewChild('route') panelElement: ElementRef;
  @ViewChild('map2') map2Element: ElementRef;

  constructor(public nav: NavController, public maps: Bingmap, public node: Node, public wave: Wave) {
    this.mycarNumber = node.getcarNumber();
  }
  inputRoute() :void{
    this.node.setPoint(this.startP,this.endP);
    console.log("startp,endp",this.startP,this.endP);
    this.viewRoute();
    this.startSocket();
  }
  viewRoute() :void{
    this.maps.inputMode(this.panelElement.nativeElement, this.map2Element.nativeElement);
  }
  startSocket() :void{
    this.wave.initsocket();
  }
  playstep() :void{
    /*
    this.time = new Date();
       setInterval(() => this.time = new Date(), 1000);*/
    setInterval(()=> this.node.removeFirstRoute(), 10000);
  }
}
