import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MapService} from 'src/app/services/map/map.service';
import {PointsLayerService} from '../../services/points-layer/points-layer.service';
import {Action} from '../../models/action.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapViewNode', {static: true}) private mapViewEl: ElementRef;

  Action = Action;

  public modes = {
    [Action.CREATE]: false,
    [Action.UPDATE]: false,
    [Action.DELETE]: false
  };
  public classes = {
    [Action.CREATE]: {
      'activate-button': true,
      'deactivate-button': false
    },
    [Action.UPDATE]: {
      'activate-button': true,
      'deactivate-button': false
    },
    [Action.DELETE]: {
      'activate-button': true,
      'deactivate-button': false
    }
  };

  constructor(
    private mapService: MapService,
    private pointsLayerService: PointsLayerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapService.initMap(this.mapViewEl);
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }

  action(action: Action) {
    if (this.modes[action]) {
      this.activateAllButtons();
      this.pointsLayerService.deactivate[action].bind(this.pointsLayerService)();
    } else {
      this.deactivateButtonsExcept(action);
      this.pointsLayerService.activate[action].bind(this.pointsLayerService)();
    }
    this.modes[action] = !this.modes[action];
  }

  activateAllButtons() {
    Object.values(Action)
      .forEach(action => this.classes[action] = {
        'activate-button': true,
        'deactivate-button': false
      });
  }

  deactivateButtonsExcept(actionToFilter: Action) {
    Object.values(Action)
      .filter(action => action !== actionToFilter)
      .forEach(action => this.classes[action] = {
        'activate-button': false,
        'deactivate-button': true
      });
  }

  disabled(notDisabledAction: Action) {
    return Object.values(Action)
      .filter(action => action !== notDisabledAction)
      .some(action => this.modes[action]);
  }
}
