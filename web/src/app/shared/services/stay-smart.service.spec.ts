import {TestBed} from '@angular/core/testing';

import {StaySmartService} from './stay-smart.service';
import {TestingModule} from '../../testing/testing.module';

describe('StaySmartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TestingModule,
    ],
  }));

  it('should be created', () => {
    const service: StaySmartService = TestBed.inject(StaySmartService);
    expect(service).toBeTruthy();
  });
});
