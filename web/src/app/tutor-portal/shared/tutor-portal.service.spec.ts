import {TestBed} from '@angular/core/testing';

import {TutorPortalService} from './tutor-portal.service';
import {TestingModule} from '../../testing/testing.module';

describe('TutorPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      TestingModule,
    ],
    providers: [TutorPortalService]
  }));

  it('should be created', () => {
    const service: TutorPortalService = TestBed.inject(TutorPortalService);
    expect(service).toBeTruthy();
  });
});
