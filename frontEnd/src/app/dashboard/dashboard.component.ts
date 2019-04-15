import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { ImagesService } from '../list-images/images.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public uploader: FileUploader = new FileUploader(
    {
      url : 'localhost:5858/upload',
      itemAlias: 'tar'
    }  // TOODO A CONFIG SERVER WITH VALUES 
  );
  private imagesService:ImagesService;

  constructor(imagesService:ImagesService) {
    this.imagesService = imagesService;
   }

  ngOnInit() {
       this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         alert("(NO UI) Creation and running of a container for the file:  " + item.file.name )
       }
  }

  CreateLogs(){
    this.imagesService.createLogs()
  }


}
