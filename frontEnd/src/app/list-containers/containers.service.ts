import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { SocketTypes } from '../../../../shared/httpModels/socketTypes';

@Injectable()
export class ContainersService {
  private containersDictionary: { [id: string]: any; } = {};
  private containersStatsStreamSubject: Subject<any[]> = new Subject();

  constructor(private socket: Socket) {
    // Will be better to call this every time someone call getCotnaienrsStatsStream
    // and sent some boolean value if this a request to start streaming or stop streaming
    // but will be overengineering for one page
    this.socket.emit(SocketTypes.GetContainersStatsStream);
  }

  /*
    Return a Subject that event all the containers.
    If you have two clients
  */
  getContainersStatsStream(): Observable<any[]>  {
    this.socket.fromEvent(SocketTypes.GetContainersStatsStream).subscribe( (data:any) => {
      this.containersDictionary[data.Id] = data;
      this.containersStatsStreamSubject.next(_.values(this.containersDictionary));
    });
    return this.containersStatsStreamSubject.asObservable();
  }

  getList(): Observable<any>{
     return this.socket
            .fromEvent(SocketTypes.ContainersList);
  }

 }