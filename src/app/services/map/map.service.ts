import { Injectable, ElementRef } from '@angular/core';
import Map from 'arcgis-js-api/Map';
import MapView from 'arcgis-js-api/views/MapView';

import esri = __esri;
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {}

  public map: esri.Map;
  public mapView$: Subject<esri.MapView> = new Subject<esri.MapView>();
  // tslint:disable-next-line:variable-name
  private _mapView: esri.MapView;

  private listener: IHandle;

  private static getMapProperties(): esri.MapProperties {
    return {
      basemap: 'streets'
    };
  }

  public initMap(mapViewEl: ElementRef) {
    try {
      const mapProperties: esri.MapProperties = MapService.getMapProperties();
      this.map = new Map(mapProperties);
      const mapViewProperties: esri.MapViewProperties = this.getMapViewProperties(mapViewEl);
      this._mapView = new MapView(mapViewProperties);
      this._mapView.when(() => {
        this.mapView$.next(this._mapView);
        this.mapView$ = new BehaviorSubject<esri.MapView>(this._mapView);
      });
    } catch (error) {
      console.error('Esri: ', error);
    }
  }

  public setClickHandler(listener: esri.MapViewClickEventHandler) {
    this.listener?.remove();
    this.listener = this._mapView.on('click', listener);
  }

  public stopClickHandler() {
    this.listener?.remove();
    this.listener = undefined;
  }

  private getMapViewProperties(mapViewEl: ElementRef): esri.MapViewProperties {
    return {
      container: mapViewEl.nativeElement,
      center: [0.1278, 51.5074],
      zoom: 10,
      map: this.map
    };
  }

  destroyMap() {
    if (this._mapView) {
      this._mapView.container = null;
    }
    this.listener?.remove();
  }
}
