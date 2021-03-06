import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ContainersViewModel } from './containers.viewmodel';
import { ContainersService } from './containers.service';
import { auditTime } from 'rxjs/operators';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-containers',
  templateUrl: './list-containers.component.html',
  styleUrls: ['./list-containers.component.css']
})
export class ListContainersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ram', 'cpu', 'State'];
  dataSource = new MatTableDataSource();
  AllSubsForDisposal: Subscription = new Subscription();

  constructor(private containerService: ContainersService) {

  }

  ngOnInit() {
    this.AllSubsForDisposal.add(this.containerService.getContainersStatsStream().pipe(
      auditTime(400) // TODO 400 go to a config,
    ).subscribe((data) => {
      data = data.map( (e) => {
        return new ContainersViewModel(e);
      });
      this.dataSource = new MatTableDataSource(data);
    }));
  }

  ngOnDestroy() {
    this.AllSubsForDisposal.unsubscribe();
  }

}