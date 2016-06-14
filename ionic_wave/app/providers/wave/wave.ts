import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Node} from '../../providers/node/node';
import {Data} from '../../providers/data/data';
import {Selection} from '../../providers/selection/selection';
import 'rxjs/add/operator/map';

@Injectable()
export class Wave {
  socket: any;
  constructor( public node:Node, public serviceData : Data, public myselection : Selection) {}

  initsocket(){
    this.socket =io('http://ec2-52-79-124-11.ap-northeast-2.compute.amazonaws.com:3100');
    this.initCCH();
    this.initSCH();
  }

  initCCH(){
    //서버에 접근했을때 메세지를 받음
    this.socket.on('toclient',function(data){
      console.log("severmsg",data.msg);
    });
    //서버로부터 cch메세지를 받았을때
    let tempsocket = this.socket;
    let mynode = this.node;
    this.socket.on('from_cch_msg',function(data){
      //console.log('from_cch_msg',data.carnum, data.coordx, data.coordy, data.maneuver );
      //내 경로의 첫번째 route와 같으면 자신의 차량번호 전송
      if( mynode.compFirstpacket(data)){
        //console.log("correct");
        tempsocket.emit('to_cch_recv',{recv_carnum :data.carnum, send_carnum : mynode.getcarNumber() ,msg:'cchrecv'});
      }
    });
  }

  initSCH(){
    let tempsocket = this.socket;
    let mynode = this.node;
    this.socket.on('from_sch_msg', function(data){
      let sch_packet = mynode.getSchpacket(data.fullpath);
      tempsocket.emit('to_sch_recv',{ scarnum : data.scarnum, rcarnum : data.rcarnum, sch_packet : sch_packet });
    })
  }

  //connectedService를 실행하는 차량
  connectedCarServie(){
    //서버로부터 cch broadcast 를 통한 응답차량의 메시지를 받는다.
    //let prevcount = this.serviceData.getCarslen();
    let sData = this.serviceData;
    let myselect = this.myselection;
    /*
    data - carnum : data.carnum
    */
    this.socket.on('from_cch_recv', function(data){
      sData.addCar(data);
      console.log('from_cch_recv',data);
    });
    this.socket.on('from_sch_recv', function(data){
       console.log('from_sch_recv',data);
        myselect.push(data);
        console.log('from_sch_recv', data);
    })
  }

  connectedCCH( packet : any  ){
    //cch broadcast 메세지를 전송한다.
    //console.log("connectedCCH packet:",packet );
    //console.log("connectedCCH packet2:",packet.carnum, packet.coordx, packet.coordy, packet.maneuver );
    this.socket.emit('to_cch_msg',{ carnum : packet.carnum,
                                    coordx : packet.coordx,
                                    coordy : packet.coordy,
                                    maneuver : packet.maneuver });
  }

  connectedSCH( send_carnum : any,recv_carnum: any, fullpath : any ){
    console.log('connectedSCH',send_carnum , recv_carnum );
    this.socket.emit('to_sch_msg',{ scarnum : send_carnum,
                                    rcarnum : recv_carnum,
                                    fullpath : fullpath });
  }

}
