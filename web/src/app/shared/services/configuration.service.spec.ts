import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {TestingModule} from '../../testing/testing.module';

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ]
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
