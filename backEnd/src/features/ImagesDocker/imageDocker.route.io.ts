import { SocketTypes } from '../../../../shared/httpModels/socketTypes';
import { IntervalControl } from '../../utils/intervalControler';

import { fromEvent } from 'rxjs';
import { Subject } from 'rxjs/Subject';
class ImageDockerRouteIo{
    private ImageDockerService;
    private SocketIo;
    private IntervalControl: IntervalControl;
    private imageListSubj: Subject<any> = new Subject();

    constructor({ImageDockerService:ImageDockerService, SocketIo}) {
      this.ImageDockerService = ImageDockerService;
      this.SocketIo = SocketIo;
      this.IntervalControl = new IntervalControl(3000); //TODO injection
      this.init();
    }

    init(){
      // Maybe this can be replaced by a rxjs timer(sure can TODO )? 
      this.IntervalControl.callInterval( // sends new images list every 3 seconds
        this.callGetList.bind(this)
      )
      this.SocketIo.on("connect", async (socket) => {

        fromEvent(socket, SocketTypes.ImagesList).subscribe( ()=>{
          this.imageListSubj.subscribe( (data)=>{
            socket.emit(SocketTypes.ImagesList, data);
          });
        });

        fromEvent(socket, SocketTypes.RunImage ).subscribe((name) => { 
          this.ImageDockerService.run(name).subscribe((isSucceeded) => {
            socket.emit(SocketTypes.CreateAndRunImage, isSucceeded)
          })
        })

        socket.on("disconnect", () => {
          // dispose something??? time is money and ram is free
        });
      });
    }
  
    async callGetList(){
      this.ImageDockerService.getList().subscribe((data) => {
        this.imageListSubj.next(data);
      })
    }

}

module.exports = ImageDockerRouteIo