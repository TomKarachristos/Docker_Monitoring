import { Injectable } from '@angular/core';
//import { Socket } from 'ng6-socket-io';

export interface containerStatus {
  name: string;
  ram: string;
  cpu: string;
  io: string
}

@Injectable()
export class ContainersService {

  constructor() { }

  start(msg: string){
       //this.socket.emit("message", msg);
  }

  getList(): containerStatus[] {
    return <containerStatus[]>[
      { name: 'Hydrogen', ram: "5", cpu: 'H', io:"5%"},
      { name: 'Hydrogen', ram: "5", cpu: 'H', io:"5%"},
      { name: 'Hydrogen', ram: "5", cpu: 'H', io:"5%"},
      { name: 'Hydrogen', ram: "5", cpu: 'H', io:"5%"},
    ];
  }

}