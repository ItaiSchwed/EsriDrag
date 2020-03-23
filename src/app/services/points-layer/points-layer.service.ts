import { Injectable } from '@angular/core';
import { MapService as MapService } from '../map/map.service';

import esri = __esri;
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import { SimpleMarkerSymbol } from 'esri/symbols';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel"

@Injectable({
  providedIn: 'root'
})
export class PointsLayerService {


  private sketch: esri.SketchViewModel;

  public layerId: string = "pointsGraphic"

  constructor(private mapService: MapService) {
    this.mapService.mapView.subscribe(mapView => {

      this.sketch = new SketchViewModel({
        view: mapView,
        layer: new GraphicsLayer({
          id: this.layerId
        }),
        pointSymbol: new SimpleMarkerSymbol({
          color: [255, 0, 0],
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        })
      });

      this.mapService.map.add(this.sketch.layer);

      this.mapService.setUpClickHandler(event => {
        console.log("srtfhsrgtfhs");
        if (event.native.ctrlKey) {
          this.sketch.create("point");
        }
      })
    });
  }

}
