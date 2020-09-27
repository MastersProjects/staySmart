import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {ApLoginComponent} from './ap-login.component';
import {TestingModule} from '../../../testing/testing.module';
import {AdminAuthService} from '../../../auth/admin-auth.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';

describe('ApLoginComponent', () => {
  let component: ApLoginComponent;
  let fixture: ComponentFixture<ApLoginComponent>;
  let adminAuthService: AdminAuthService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [ApLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApLoginComponent);
    component = fixture.componentInstance;
    adminAuthService = TestBed.inject(AdminAuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should login on valid', fakeAsync(() => {
      component.isLoading = false;
      component.loginForm.setValue({
        email: 'Ben@Dover.ch',
        password: '123456'
      });
      (component as any).user = undefined;
      component.emailVerifiedError = false;
      spyOn(adminAuthService, 'login').and.returnValue(of(
        {
          user: {
            emailVerified: true,
            email: 'Ben@Dover.ch'
          }
        }
      ).toPromise());
      spyOn(router, 'navigate');

      component.login();
      expect(component.isLoading).toBeTruthy();
      tick(100);

      expect(adminAuthService.login).toHaveBeenCalledWith('Ben@Dover.ch', '123456');
      expect(router.navigate).toHaveBeenCalledWith(['/admin-portal']);
      expect((component as any).user).toBeUndefined();
      expect(component.emailVerifiedError).toBeFalsy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not login on email not verified', fakeAsync(() => {
      component.isLoading = false;
      component.loginForm.setValue({
        email: 'Ben@Dover.ch',
        password: '123456'
      });
      (component as any).user = undefined;
      component.emailVerifiedError = false;
      spyOn(adminAuthService, 'login').and.returnValue(of(
        {
          user: {
            emailVerified: false,
            email: 'Ben@Dover.ch'
          }
        }
      ).toPromise());
      spyOn(router, 'navigate');

      component.login();
      expect(component.isLoading).toBeTruthy();
      tick(100);

      expect(adminAuthService.login).toHaveBeenCalledWith('Ben@Dover.ch', '123456');
      expect(router.navigate).not.toHaveBeenCalled();
      expect((component as any).user).toEqual({
        emailVerified: false,
        email: 'Ben@Dover.ch'
      });
      expect(component.emailVerifiedError).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not login on userCredential undefined', fakeAsync(() => {
      component.isLoading = false;
      component.loginForm.setValue({
        email: 'Ben@Dover.ch',
        password: '123456'
      });
      (component as any).user = undefined;
      component.emailVerifiedError = false;
      spyOn(adminAuthService, 'login').and.returnValue(of(undefined).toPromise());
      spyOn(router, 'navigate');

      component.login();
      expect(component.isLoading).toBeTruthy();
      tick(100);

      expect(adminAuthService.login).toHaveBeenCalledWith('Ben@Dover.ch', '123456');
      expect(router.navigate).not.toHaveBeenCalled();
      expect((component as any).user).toBeUndefined();
      expect(component.emailVerifiedError).toBeFalsy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not login on form invalid', fakeAsync(() => {
      component.isLoading = false;
      component.loginForm.setValue({
        email: '',
        password: ''
      });
      spyOn(adminAuthService, 'login').and.returnValue(of(undefined).toPromise());

      component.login();
      expect(component.isLoading).toBeFalsy();
      tick(100);

      expect(adminAuthService.login).not.toHaveBeenCalledWith();
    }));
  });

  describe('sendEmailVerification', () => {
    it('should send Email Verification Email and logout', fakeAsync(() => {
      (component as any).user = {
        emailVerified: false,
        email: 'Ben@Dover.ch',
        sendEmailVerification: () => of({}).toPromise()
      };
      component.emailVerifiedError = true;
      component.emailVerificationSent = false;
      spyOn((component as any).user, 'sendEmailVerification').and.callThrough();
      spyOn(adminAuthService, 'logout').and.returnValue(of({}).toPromise());

      component.sendEmailVerification();
      tick(100);

      expect((component as any).user.sendEmailVerification).toHaveBeenCalled();
      expect(adminAuthService.logout).toHaveBeenCalled();
      expect(component.emailVerifiedError).toBeFalsy();
      expect(component.emailVerificationSent).toBeTruthy();
    }));
  });

  describe('userEmail', () => {
    it('should return user email', fakeAsync(() => {
      (component as any).user = {
        email: 'Ben@Dover.ch',
      };

      expect(component.userEmail).toBe('Ben@Dover.ch');
    }));
  });
});
