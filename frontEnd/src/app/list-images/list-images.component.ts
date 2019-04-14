import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ImagesService } from './images.service';
import * as _ from "lodash";
import { auditTime } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { SocketTypes } from '../../../../shared/httpModels/socketTypes';


class imageContainerViewModel {
  name: string;
  // a better approach will be https://github.com/loedeman/AutoMapper
  constructor(backContainer){
    this.name = backContainer.RepoTags;
  }
}


@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'Actions'];
  dataSource = new MatTableDataSource([]);

  constructor( private imagesService: ImagesService) {
   }

  ngOnInit() {
    this.imagesService.getList().pipe(
      auditTime(400) // TODO 400 go to a config
    ).subscribe( (data) => {
      this.dataSource = new MatTableDataSource(
        _.map(data, element => new imageContainerViewModel(element))
      )
    });
  }

  run(name: string[]) {
    this.imagesService.run( name[0] );
  }

}