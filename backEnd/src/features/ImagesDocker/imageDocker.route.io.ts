import { SocketTypes } from '../../../../shared/httpModels/socketTypes';
import { fromEvent, timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


class ImageDockerRouteIo{
    private ImageDockerService;
    private SocketIo;

    constructor({ImageDockerService:ImageDockerService, SocketIo}) {
      this.ImageDockerService = ImageDockerService;
      this.SocketIo = SocketIo;
      this.init();
    }

    init(){
     
      this.SocketIo.on("connect", (socket) => {
        let AllSubsForDisposal: Subscription = new Subscription();
        AllSubsForDisposal.add(
          fromEvent(socket, SocketTypes.ImagesList).subscribe(() => {
            AllSubsForDisposal.add(timer(0, 2000).subscribe(() => {
              this.ImageDockerService.getList().pipe(take(1)).subscribe((data) => {
                socket.emit(SocketTypes.ImagesList, data);
              });
            }))
          }));

        AllSubsForDisposal.add(
          fromEvent(socket, SocketTypes.RunImage).subscribe((name) => { 
          this.ImageDockerService.run(name).pipe(take(1)).subscribe((isSucceeded) => {
            socket.emit(SocketTypes.CreateAndRunImage, isSucceeded)
          })
        }))

        socket.on("disconnect", () => {
          // free my memory
          AllSubsForDisposal.unsubscribe();
          // take(1) will release the  rest of the subscribes
        });
      });
    }
  
}

module.exports = ImageDockerRouteIo