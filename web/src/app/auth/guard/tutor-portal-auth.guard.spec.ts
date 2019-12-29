import {inject, TestBed} from '@angular/core/testing';

import {TutorPortalAuthGuard} from './tutor-portal-auth.guard';

describe('PortalAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorPortalAuthGuard]
    });
  });

  it('should ...', inject([TutorPortalAuthGuard], (guard: TutorPortalAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
