
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketTypes } from '../../../../shared/httpModels/socketTypes';
import { Observable } from 'rxjs';

export interface ImagesTable {
  name: string;
}

@Injectable()
export class ImagesService {

  constructor(private socket: Socket) {
    this.socket.emit(SocketTypes.ImagesList);
  }

  run(msg: string) {
    this.socket.emit(SocketTypes.RunImage, msg);
    this.socket.once(SocketTypes.CreateAndRunImage, (isSucceeded) => {
      if (isSucceeded) { alert("Images created and running(not enough time for ui)") }
      else { alert("image creation and running not succeeded(not enough time for ui") }
    });
  }

  createLogs() {
    this.socket.emit(SocketTypes.ConsolidateLogsOfallContainer);
    alert("A file will be created in backend folder with the name ConsolidateLogs");
  }

  getList(): Observable<ImagesTable[]> {
    return this.socket
      .fromEvent(SocketTypes.ImagesList);
  }

}
