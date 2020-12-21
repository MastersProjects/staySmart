import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AdminPortalComponent} from './admin-portal.component';
import {TestingModule} from '../testing/testing.module';
import {AdminAuthService} from '../auth/admin-auth.service';
import {Router} from '@angular/router';

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [AdminPortalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should logout and navigate', fakeAsync(() => {
      const adminAuthService = TestBed.inject(AdminAuthService);
      const router = TestBed.inject(Router);
      spyOn(adminAuthService, 'logout');
      spyOn(router, 'navigate');

      component.logout();
      tick(100);

      expect(adminAuthService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/admin-portal/login']);
    }));
  });
});
