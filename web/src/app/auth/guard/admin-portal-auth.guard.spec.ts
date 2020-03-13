import {TestBed} from '@angular/core/testing';

import {AdminPortalAuthGuard} from './admin-portal-auth.guard';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {RouterTestingModule} from '@angular/router/testing';

describe('AdminPortalAuthGuard', () => {
  let guard: AdminPortalAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
        RouterTestingModule
      ],
      providers: [AdminPortalAuthGuard]
    });
    guard = TestBed.inject(AdminPortalAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
