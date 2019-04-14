import { SocketTypes } from '../../../../shared/httpModels/socketTypes';
var multer = require('multer');
const Status = require('http-status')

class ImageDockerRouteEx{
    private ImageDockerService;
    private router;
    private upload;
    
    constructor({ImageDockerService, router}) {
      this.ImageDockerService = ImageDockerService;
      this.router = router;
      this.upload = multer({dest: './uploads/'}).single('tar'); // TODO pu this values to config
      this.init();
    }

    init(){
      this.router.post('/upload', (req, res, next) => {
        this.upload(req, res, async (err) => {
            if (err) { return res.status(Status.UNPROCESSABLE_ENTITY).send("an Error occured") }  

            let path = req.file.path;
            await this.ImageDockerService.create(path,req.file.originalname)
            return res.send("Upload Completed for " + path); 
          });     
       })
   }


}

module.exports = ImageDockerRouteEx