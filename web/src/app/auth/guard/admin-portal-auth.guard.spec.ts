import {TestBed} from '@angular/core/testing';

import {AdminPortalAuthGuard} from './admin-portal-auth.guard';
import {TestingModule} from '../../testing/testing.module';

describe('AdminPortalAuthGuard', () => {
  let guard: AdminPortalAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalAuthGuard]
    });
    guard = TestBed.inject(AdminPortalAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
