import { Injectable, ElementRef } from '@angular/core';
import Map from "arcgis-js-api/Map";
import MapView from "arcgis-js-api/views/MapView";

import esri = __esri
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public map: esri.Map;
  public mapView: Subject<esri.MapView> = new Subject<esri.MapView>();
  private _mapView: esri.MapView;

  private listener: IHandle;

  constructor(){}

  public initMap(mapViewEl: ElementRef) {
    try {
      const mapProperties: esri.MapProperties = this.getMapProperties();
      this.map = new Map(mapProperties);
      const mapViewProperties: esri.MapViewProperties = this.getMapViewProperties(mapViewEl);
      this._mapView = new MapView(mapViewProperties);
      this._mapView.when(() => this.mapView.next(this._mapView));
    }
    catch (error) {
      console.error("Esri: ", error);
    }
  }

  public setUpClickHandler(listener: esri.MapViewClickEventHandler){
    this.listener?.remove();
    this.listener = this._mapView.on("click", listener);
  }

  private getMapViewProperties(mapViewEl: ElementRef): esri.MapViewProperties {
    return {
      container: mapViewEl.nativeElement,
      center: [0.1278, 51.5074],
      zoom: 10,
      map: this.map
    };
  }

  private getMapProperties(): esri.MapProperties {
    return {
      basemap: "streets"
    };
  }

  destroyMap() {
    if (this._mapView) {
      this._mapView.container = null;
    }
    this.listener.remove();
  }
}
