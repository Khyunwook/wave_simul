import {Alert, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Wave} from '../../providers/wave/wave';
import {Node} from '../../providers/node/node';
import {Data} from '../../providers/data/data';
import {Selection} from '../../providers/selection/selection';
/*
  Generated class for the WavesimulPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/wavesimul/wavesimul.html',
})
export class WavesimulPage {
  pageview : boolean = false;
  nearCarslen :number = 0;
  cars: any;
  schcar : number = 0;
  printlists : any;
  selectedCar : any;
  onoffinit : boolean = false;
  onoffwave : boolean = false;
  oncch : boolean = false;
  onsch : boolean = false;
  isitschcar : boolean = true;

  constructor(public nav: NavController, public wave: Wave, public node: Node, public dataService: Data,
              public selection : Selection) {
    //this.dataService.load().subscribe( data => { this.cars = data; console.log('this.cars',this.cars);
    //this.nearCarslen = this.cars.length;
    //});
  }
  initWave(){
    //this.pageview = true;
    if( this.onoffinit === false ){
      this.wave.connectedCarServie();//나중에 한번만 실행하도록....
      //커넥티드 카 서비스 시작.
      this.onoffinit = true;
    }else{
      this.onoffinit = false;
    }
    this.doConnectedcar();
  }
  playWave(){
    this.oncch = true;
    setInterval(()=> this.sendCCH(), 5000);
    setInterval(()=> this.setNearCarlen(), 5100);
    setTimeout(()=> setInterval(()=> this.sendSCH(), 5000), 2500);
    //setInterval(()=> this.sendSCH(), 5000);
  }
  selectConnectedCar(car){
    this.selectedCar = car;
    this.doselectcar(car);
  }

  sendCCH(){
    this.onsch = false;
    this.oncch = true;
    let carnumber = this.node.getcarNumber();
    let firstRoute = this.node.getFirstRoute();
    let cchpacket = {
      carnum : carnumber,
      coordx : firstRoute.coordinate.latitude,
      coordy : firstRoute.coordinate.longitude,
      maneuver : firstRoute.maneuver
    }
    console.log("sendCCH",cchpacket);
    this.wave.connectedCCH( cchpacket );
  }

  setNearCarlen(){
    this.nearCarslen = this.dataService.getCarslen();
  }

  sendSCH(){
    this.oncch = false;
    this.onsch = true;
    let carid = this.dataService.getOneCar();
    if(carid === undefined ){
        this.isitschcar=true;
    }else{
        this.isitschcar=false;
    }
    console.log("carid",carid);
    this.schcar = carid;
    let myroute = this.node.getmyRoute();
    let recv_carnum = this.node.getcarNumber();
    console.log("sendSCH", carid , recv_carnum);
    this.wave.connectedSCH(carid, recv_carnum, myroute);
    this.makelist();
    //this.cars = this.dataService.getCars();
  }

  makelist(){
    this.printlists = this.selection.getHeaparr();
  }

  doConnectedcar() {
    let alert = Alert.create({
      title: 'Connected car service!',
      subTitle: '커넥티드 카 서비스를 실행합니다.',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  doselectcar( car ) {
    let alert = Alert.create({
      title: car.scarnum +'차량을 따라갑니다.',
      subTitle: '핸들에서 손을 놓으셔도 됩니다.',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

}
