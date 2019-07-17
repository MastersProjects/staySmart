import { TestBed, async } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientModule } from '@angular/common/http';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [LocationService]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });

  it('should return result list', async(() => {
    const service: LocationService = TestBed.get(LocationService);
    service.searchLocation('dueben').subscribe(res =>
      expect(res.length).toBeGreaterThan(0)
    );
  }));

  it('should return empty list', async(() => {
    const service: LocationService = TestBed.get(LocationService);
    service.searchLocation('').subscribe(res =>
      expect(res.length).toBe(0)
    );
  }));

  it('should return parsed object list', async(() => {
    const service: LocationService = TestBed.get(LocationService);
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
