import { fromEvent, from, Observable, Subject } from 'rxjs';


class ImageDockerService {  // TODO better DockerContainersService ?
    private docker;
    private logger;

    constructor({ docker, logger }) {
        this.docker = docker;
        this.logger = logger;
    }

    async create(filepath: string, name: string) {
        try { // TODO MAKE THIS OBS
            await docker.buildImage(filepath, { t: name.toLowerCase() })
        } catch (er) {
          this.logger.info("ImageDockerServiceError: ${err}");
        }
    }

    getList() : Observable <any>  {
        return from(docker.listImages());
    }

    run(tagName): Observable<any> {
        var subj = new Subject();
        docker.createContainer({ Image: tagName }, function (err, container) {
            if(err) {subj.error(false); return;}
            container.start(function (err, data) {
                if(err) subj.error(false)
                subj.next(true);
            });
        });
        return subj.asObservable();
    }

}

module.exports = ImageDockerService;