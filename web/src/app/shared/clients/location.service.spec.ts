import {TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';
import { HttpClientModule } from '@angular/common/http';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
});
