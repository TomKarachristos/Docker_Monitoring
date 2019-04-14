import { from, Observable } from 'rxjs';
import {Subject} from 'rxjs/Subject';
import { GeneratedKeyedCollection } from '../../utils/GeneratedKeyedCollection';

class ContainersDockerService { 
  private docker;
  private dockerContainers: GeneratedKeyedCollection<any>;

  private streamCache: { 
    [id: string] :{
      countOfusers:number,
      subject:Subject<any>
  } } = {};

  constructor({docker}) {
    this.docker = docker;
    this.dockerContainers =  new GeneratedKeyedCollection(this.docker.getContainer.bind(this.docker));
  }

  getList(): Observable<any> {
    return from(docker.listContainers({all:true}));
  }

  public getStatStream(id:number): Observable<any> {
    if(this.streamCache[id]) {
      this.streamCache[id].countOfusers += 1
      return this.streamCache[id].subject;
    }

    var statsForContainer = this.dockerContainers.AddAndGet(id);
    this.streamCache[id] = {
      countOfusers:1,
      subject: new Subject()
    };
    statsForContainer.stats({ stream: true },this.statsStream.bind(this))
    return this.streamCache[id].subject.asObservable();
  }

  private statsStream(err, stream){
    docker.modem.followProgress(stream, () => {
    }, (data) => {
        this.streamCache[data.id].subject.next(data);
    });
  }

  public unSubscribeStatStream(id:number){
    // do stream.req.socket.end() when countOfusers go 0
  }

  public getLogsOfAllContainer(){
    this.getList().subscribe( (containers)=>{
      let allLogs = "";
      containers.forEach(element => {
        this.dockerContainers.AddAndGet(element.Id).logs({follow:false}, 
          (err,data)=>{
            allLogs += data;
        })
      });
      this.WriteLogsToDisk(allLogs);
    });
  }

  /// Is not belong here. REFACTORY THIS
  private WriteLogsToDisk(logs: String) {
    var fs = require('fs');
    var stream = fs.createWriteStream("ConsolidateLogs.txt");
    stream.once('open', (fd) => {
      stream.write(logs);
      stream.end();
    });
  }

}

module.exports = ContainersDockerService;