import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  constructor(private mapService: MapService) {}

  

  ngOnInit() {
    this.mapService.initMap(this.mapViewEl);
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }
}