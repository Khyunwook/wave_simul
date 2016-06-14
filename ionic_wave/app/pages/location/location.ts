import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {Bingmap} from '../../providers/bingmap/bingmap';
import {Data} from '../../providers/data/data';
import {Wave} from '../../providers/wave/wave';
import {Node} from '../../providers/node/node';


@Page({
  templateUrl: 'build/pages/location/location.html',
  providers: [Bingmap]
})
export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;

  latitude: number;
  longitude: number;
  mycarNumber :number;

  constructor(public nav: NavController, public maps: Bingmap, public platform: Platform, public dataService: Data, public node: Node) {
    this.mycarNumber = this.node.getcarNumber();
    console.log("carNumber",this.mycarNumber);
  }

  ngAfterViewInit(): void {
    let mapLoaded = this.maps.init(this.mapElement.nativeElement);
    mapLoaded.subscribe(update => {
      //this.maps.changeMarker(this.latitude, this.longitude);
    });
  }

  setLocation(): void {

  }

  takeMeHome(): void {
  }

 }
