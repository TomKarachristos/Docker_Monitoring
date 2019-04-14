import { fromEvent, Subject, timer } from 'rxjs';
import * as _ from 'lodash';
import { SocketTypes } from '../../../../shared/httpModels/socketTypes';
import { take } from 'rxjs/operators';

class ContainersDockerRoute{
    private containersDockerService;
    private SocketIo;
    private containersStatsSubj: Subject<any> = new Subject();
  DockerContainersService: any;

    constructor({containersDockerService, SocketIo}) {
      this.containersDockerService = containersDockerService;
      this.SocketIo = SocketIo;
      this.init();
    }

    init(){
      timer(0,2000).subscribe( ()=>{
        this.emitStatsOfContainers()
      })

      this.SocketIo.on("connect", (socket) => {

        let getContainersStatsStreamObs = 
        fromEvent(socket, SocketTypes.GetContainersStatsStream).subscribe( ()=>{
          this.containersStatsSubj.subscribe( (data)=>{
            socket.emit(SocketTypes.GetContainersStatsStream, data);
          });
        });

        let consolidateLogsObs =fromEvent(socket, SocketTypes.ConsolidateLogsOfallContainer).subscribe(
          this.ConsolidateLogsOfallContainer.bind(this)
        )

        socket.on("disconnect", () => {
          getContainersStatsStreamObs.unsubscribe();
          consolidateLogsObs.unsubscribe();
          // someday i will make a unsubscribe for the getStatStream 
          // but time is money and ram is free
        });
      });
    }
  
    private ConsolidateLogsOfallContainer(){
      this.containersDockerService.getLogsOfAllContainer();
    }

    private idsHadSubscribe: Set<string> = new Set();
    private emitStatsOfContainers(){
      this.containersDockerService.getList().pipe(take(1)).subscribe( (listOfContainers)=>{
          _.filter(listOfContainers, e => !this.idsHadSubscribe.has(e.Id)).forEach(element => {
          this.idsHadSubscribe.add(element.Id);
          this.containersDockerService.getStatStream(element.Id).subscribe((data) => {
            this.containersStatsSubj.next( Object.assign({}, element, data) );
          })
        });
      });
    }

}

module.exports = ContainersDockerRoute