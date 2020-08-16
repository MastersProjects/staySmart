import {inject, TestBed} from '@angular/core/testing';

import {TutorPortalAuthGuard} from './tutor-portal-auth.guard';
import {TestingModule} from '../../testing/testing.module';

describe('PortalAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      providers: [TutorPortalAuthGuard]
    });
  });

  it('should ...', inject([TutorPortalAuthGuard], (guard: TutorPortalAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
