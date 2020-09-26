import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {ApResetPasswordComponent} from './ap-reset-password.component';
import {TestingModule} from '../../../testing/testing.module';
import {of} from 'rxjs';
import {AdminAuthService} from '../../../auth/admin-auth.service';

describe('ApResetPasswordComponent', () => {
  let component: ApResetPasswordComponent;
  let fixture: ComponentFixture<ApResetPasswordComponent>;
  let adminAuthService: AdminAuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApResetPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApResetPasswordComponent);
    component = fixture.componentInstance;
    adminAuthService = TestBed.inject(AdminAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendPasswordResetEmail', () => {
    it('should send reset password email on form valid', fakeAsync(() => {
      component.resetPasswordForm.setValue({email: 'Ben@Dover.ch'});
      component.isLoading = false;
      component.submitted = false;
      spyOn(adminAuthService, 'resetPassword').and.returnValue(of({}).toPromise());

      component.sendPasswordResetEmail();
      expect(component.isLoading).toBeTruthy();
      tick(100);

      expect(adminAuthService.resetPassword).toHaveBeenCalledWith('Ben@Dover.ch');
      expect(component.submitted).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should not send reset password email on form invalid', fakeAsync(() => {
      component.resetPasswordForm.setValue({email: ''});
      component.isLoading = false;
      component.submitted = false;
      spyOn(adminAuthService, 'resetPassword').and.returnValue(of({}).toPromise());

      component.sendPasswordResetEmail();
      expect(component.isLoading).toBeFalsy();
      tick(100);

      expect(adminAuthService.resetPassword).not.toHaveBeenCalled();
      expect(component.submitted).toBeFalsy();
    }));
  });
});
