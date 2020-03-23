import { TestBed } from '@angular/core/testing';

import { PointsLayerService } from './points-layer.service';

describe('PointsLayerService', () => {
  let service: PointsLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
