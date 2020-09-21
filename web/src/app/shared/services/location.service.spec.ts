import {TestBed, waitForAsync} from '@angular/core/testing';

import {LocationService} from './location.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LocationService]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.inject(LocationService);
    expect(service).toBeTruthy();
  });

  it('should return result list', waitForAsync(() => {
    const service: LocationService = TestBed.inject(LocationService);
    service.searchLocation('dueben').subscribe(res =>
      expect(res.length).toBeGreaterThan(0)
    );
  }));

  it('should return empty list', waitForAsync(() => {
    const service: LocationService = TestBed.inject(LocationService);
    service.searchLocation('').subscribe(res =>
      expect(res.length).toBe(0)
    );
  }));

  it('should return parsed object list', waitForAsync(() => {
    const service: LocationService = TestBed.inject(LocationService);
    service.searchLocation('gr').subscribe(res => {
      expect(res[0].label).toBeDefined();
      expect(res[0].detail).toBeDefined();
      expect(res[0].x).toBeDefined();
      expect(res[0].y).toBeDefined();
      expect(res[0].lat).toBeDefined();
      expect(res[0].lon).toBeDefined();
      expect(res[0].geomStBox2d).toBeDefined();
    });
  }));
});
