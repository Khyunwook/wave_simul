import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  nearCars : any = [] ;
  popIndex : any = [];

  constructor() {

  }
  addCar( car ) : void {
    console.log('car.carnum', car.carnum );
    if(this.nearCars.indexOf(car.carnum)== -1 ){
      console.log('push',car.carnum);
      this.nearCars.push(car.carnum);
    }
    console.log("carlength",this.nearCars.length);

  }
  getCars(){
    return this.nearCars;
  }

  getCarslen(){
    return this.nearCars.length;
  }

  getOneCar(){
    let ret_car;
    for(let i=0; i<this.nearCars.length; i++){
      console.log("popindex",this.popIndex[0]);
       if(this.popIndex[i]=== undefined ){
         console.log("this.nearcars",this.nearCars[i]);
         ret_car = this.nearCars[i];
         this.popIndex[i]=1;
         break;
       }
    }
    if(ret_car === undefined )
      ret_car === 0; 
    return ret_car;
  }

}
