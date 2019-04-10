
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export interface ImagesTable {
  name: string;
}

@Injectable()
export class ImagesService {

  constructor() { }

  Build(msg: string) {
      // this.socket.emit("build", msg);
  }

  getList(): ImagesTable[] {
    return   [
      {name: 'Hydrogedsasadasaan'},
      {name: 'Helium'},
    ] as ImagesTable[];
  }

}
