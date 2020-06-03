import {TestBed} from '@angular/core/testing';

import {AdminPortalService} from './admin-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('AdminPortalService', () => {
  let service: AdminPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
      ],
      providers: [AdminPortalService]
    });
    service = TestBed.inject(AdminPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
