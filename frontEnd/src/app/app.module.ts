import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ListImagesComponent } from './list-images/list-images.component';
import { ListContainersComponent } from './list-containers/list-containers.component';
import { ContainersService } from './list-containers/containers.service';
import { ImagesService } from './list-images/images.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 
const config: SocketIoConfig = { url: '', options: {
  reconnection: true,
  reconnectionAttempts: 2,
  reconnectionDelay: 1000
} };

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule, 
    FlexLayoutModule,
    HttpClientModule, 
    NgHttpLoaderModule.forRoot(), 
    BrowserAnimationsModule,
    MaterialModule,
     SocketIoModule.forRoot(config)
  ],
  declarations: [ LayoutComponent, DashboardComponent, ListImagesComponent, ListContainersComponent ], 
  bootstrap:    [ LayoutComponent ], 
  providers: [ContainersService, ImagesService] 
}) 
export class AppModule { }
