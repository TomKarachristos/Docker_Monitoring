import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ImagesService } from './images.service';


@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'Actions'];
  dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private imagesService: ImagesService
  ) {
   
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(
      this.imagesService.getList()
    )
  }

}