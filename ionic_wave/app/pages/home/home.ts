import {Component} from '@angular/core';
import {LocationPage} from '../location/location';
import {AddNodePage} from '../add-node/add-node';
import {WavesimulPage} from '../wavesimul/wavesimul';
import {Node} from '../../providers/node/node';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    tab1Root: any = LocationPage;
    tab2Root: any = AddNodePage;
    tab3Root: any = WavesimulPage;
    constructor(public node : Node){
      node.initNode();
    }
 }
