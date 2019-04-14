import { IntervalControl } from '../../utils/intervalControler';
import { fromEvent, Subject } from 'rxjs';
import * as _ from 'lodash';
import { SocketTypes } from '../../../../shared/httpModels/socketTypes';

class ContainersDockerRoute{
    private containersDockerService;
    private SocketIo;
    private IntervalControl: IntervalControl;
    private containersStatsSubj: Subject<any> = new Subject();
  DockerContainersService: any;

    constructor({containersDockerService, SocketIo}) {
      this.containersDockerService = containersDockerService;
      this.IntervalControl = new IntervalControl(3000); // TODO maybe just use observal interval????
      this.SocketIo = SocketIo;
      this.init();
    }

    init(){
      this.IntervalControl.callInterval(
        this.emitStatsOfContainers.bind(this)
      )
      this.SocketIo.on("connect", (socket) => {

        fromEvent(socket, SocketTypes.GetContainersStatsStream).subscribe( ()=>{
          this.containersStatsSubj.subscribe( (data)=>{
            socket.emit(SocketTypes.GetContainersStatsStream, data);
          });
        });

        fromEvent(socket, SocketTypes.ConsolidateLogsOfallContainer).subscribe(
          this.ConsolidateLogsOfallContainer.bind(this)
        )

        socket.on("disconnect", () => {
          // someday i will make a unsubscribe for the StatsOfContainers 
          // but I dont want to die young.
        });
      });
    }
  
    private ConsolidateLogsOfallContainer(){
      this.containersDockerService.getLogsOfAllContainer();
    }

    private idsHadSubscribe: Set<string> = new Set();
    private emitStatsOfContainers(){
      this.containersDockerService.getList().subscribe( (listOfContainers)=>{
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