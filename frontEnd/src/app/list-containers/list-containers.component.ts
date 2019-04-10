import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ContainersService } from './containers.service';

@Component({
  selector: 'app-list-containers',
  templateUrl: './list-containers.component.html',
  styleUrls: ['./list-containers.component.css'] 
})
export class ListContainersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ram', 'cpu', 'io'];
  dataSource = new MatTableDataSource();

  constructor(private containerService: ContainersService) { 
  
  }

  ngOnInit() {
      this.dataSource = new MatTableDataSource(
        this.containerService.getList()
      )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}