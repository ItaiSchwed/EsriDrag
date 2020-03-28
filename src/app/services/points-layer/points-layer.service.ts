import {Injectable} from '@angular/core';
import {MapService as MapService} from '../map/map.service';

import esri = __esri;
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import {SimpleMarkerSymbol} from 'esri/symbols';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import {Action} from '../../models/action.enum';

@Injectable({
  providedIn: 'root'
})
export class PointsLayerService {

  private sketch: esri.SketchViewModel;

  public layerId = 'pointsGraphic';
  private sketchUpdateListener: IHandle;

  public activate = {
    [Action.CREATE]: this.activateCreateMode,
    [Action.UPDATE]: this.activateUpdateMode,
    [Action.DELETE]: this.activateDeleteMode
  };

  public deactivate = {
    [Action.CREATE]: this.deactivateCreateMode,
    [Action.UPDATE]: this.deactivateUpdateMode,
    [Action.DELETE]: this.deactivateDeleteMode
  };

  constructor(private mapService: MapService) {
    this.mapService.mapView$.subscribe(mapView => {

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
        }),
        updateOnGraphicClick: false
      });

      this.mapService.map.add(this.sketch.layer);
    });
  }

  private activateCreateMode() {
    this.mapService.setClickHandler(event => {
      this.sketch.create('point');
    });
  }

  private deactivateCreateMode() {
    this.mapService.stopClickHandler();
  }

  private activateUpdateMode() {
    this.mapService.setClickHandler(event => {
      this.mapService.mapView$.subscribe(mapView => {
        mapView.hitTest(event).then(response => {
          const graphics = [response.results.find(checkResult => checkResult.graphic.layer.id === this.layerId)?.graphic];
          this.sketch.update(graphics, {
            tool: 'move',
            toggleToolOnClick: false
          });
        });
      });
    });
  }

  private deactivateUpdateMode() {
    this.mapService.stopClickHandler();
  }

  private activateDeleteMode() {
    this.mapService.setClickHandler(event => {
      this.mapService.mapView$.subscribe(mapView => {
        mapView.hitTest(event).then(response => {
          const graphics = [response.results.find(checkResult => checkResult.graphic.layer.id === this.layerId)?.graphic];
          this.sketch.update(graphics).then(_ => this.sketch.delete());
        });
      });
    });
  }

  private deactivateDeleteMode() {
    this.sketchUpdateListener?.remove();
    this.mapService.stopClickHandler();
  }
}
