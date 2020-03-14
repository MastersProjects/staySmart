import {TestBed} from '@angular/core/testing';

import {TutorAuthService} from './tutor-auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('TutorAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFirePerformanceModule
    ],
  }));

  it('should be created', () => {
    const service: TutorAuthService = TestBed.inject(TutorAuthService);
    expect(service).toBeTruthy();
  });
});
