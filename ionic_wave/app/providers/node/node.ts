import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Node provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Node {
  carNumber : number;
  startPoint : any;
  endPoint : any;
  myRoute : any;
  connectedCar : any;
//힙추가

  constructor() {}
  initNode() : void {
    this.carNumber = (Math.floor(Math.random()*10000)+Math.floor(Math.random()*10000))%10000;
    //차번호 랜덤.
  }
  getmyRoute() : any {
    return this.myRoute;
  }
  //내차 번호 return
  getcarNumber() : number{
    return this.carNumber;
  }
  setPoint(sPoint, ePoint){
    this.startPoint = sPoint;
    this.endPoint = ePoint;
  }
  getSpoint() : string {
    return this.startPoint;
  }
  getEpoint() : string {
    return this.endPoint;
  }
  setRouteb(itineraryitems : any) : void {
    this.myRoute = itineraryitems;
    console.log("node.ts -> myRoute",this.myRoute);
  }

  getFirstRoute(){
    return this.myRoute[0];
  }

  compFirstpacket(packet): boolean {
    console.log ( "node compare",this.myRoute[0].coordinate.latitude, packet.coordx);
    if( this.myRoute[0].coordinate.latitude === packet.coordx &&
        this.myRoute[0].coordinate.longitude === packet.coordy &&
        this.myRoute[0].maneuver === packet.maneuver
      )
    {
        return true;
    }
    else{
      return false;
    }
  }

  //다음 route가 같은 개수 반환.
  //원래 자동차 사이 거리도 구해야 하지만 시뮬 상에서는 구현할 필요 업음.
  getSchpacket( fullpath ){
    let correct_count=0;
    let mylen = this.myRoute.length;
    let youlen = fullpath.length;
    let size = mylen > youlen ? youlen:mylen;
    for(let i=1; i<size; i++){
      //console.log("comp",this.myRoute[i].coordinate,fullpath[i].coordinate);
      if(this.myRoute[i].coordinate.latitude===fullpath[i].coordinate.latitude &&
        this.myRoute[i].coordinate.longitude===fullpath[i].coordinate.longitude
      ){
        //console.log("rou==rou");
        correct_count++;
      }else{
        break;
      }
    }
    console.log("correct_count",correct_count);
    return correct_count;
  }

  removeFirstRoute(){
    this.myRoute.shift();
    console.log('shift',this.myRoute[0]);
  }
  //힙 구현

}
