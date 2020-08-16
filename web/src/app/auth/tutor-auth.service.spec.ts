import {TestBed} from '@angular/core/testing';

import {TutorAuthService} from './tutor-auth.service';
import {TestingModule} from '../testing/testing.module';

describe('TutorAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TestingModule,
    ],
  }));

  it('should be created', () => {
    const service: TutorAuthService = TestBed.inject(TutorAuthService);
    expect(service).toBeTruthy();
  });
});
