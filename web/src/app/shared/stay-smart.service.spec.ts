import {TestBed} from '@angular/core/testing';

import {StaySmartService} from './stay-smart.service';

describe('StaySmartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaySmartService = TestBed.get(StaySmartService);
    expect(service).toBeTruthy();
  });
});
