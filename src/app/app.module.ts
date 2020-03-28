import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MapComponent } from './components/map/map.component';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapService } from './services/map/map.service';
import { PointsLayerService } from './services/points-layer/points-layer.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [
    MapService,
    PointsLayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
 }
