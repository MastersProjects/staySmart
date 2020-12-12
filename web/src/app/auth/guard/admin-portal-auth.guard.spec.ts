import {TestBed} from '@angular/core/testing';

import {AdminPortalAuthGuard} from './admin-portal-auth.guard';
import {TestingModule} from '../../testing/testing.module';
import {AdminAuthService} from '../admin-auth.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';

describe('AdminPortalAuthGuard', () => {
  let guard: AdminPortalAuthGuard;
  let adminAuthService: AdminAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalAuthGuard]
    });
    guard = TestBed.inject(AdminPortalAuthGuard);
    adminAuthService = TestBed.inject(AdminAuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true', (done) => {
      adminAuthService.adminPortalUser$ = of({firstName: 'ben', lastName: 'dover', uid: 'uid'});
      guard.canActivate().subscribe(res => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should return false and navigate to login', (done) => {
      spyOn(router, 'navigate');
      adminAuthService.adminPortalUser$ = of(null);
      guard.canActivate().subscribe(res => {
        expect(res).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['admin-portal/login']);
        done();
      });
    });
  });
});
