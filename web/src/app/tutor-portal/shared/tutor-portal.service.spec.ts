import {TestBed} from '@angular/core/testing';

import {TutorPortalService} from './tutor-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('TutorPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFirePerformanceModule
    ],
    providers: [TutorPortalService]
  }));

  it('should be created', () => {
    const service: TutorPortalService = TestBed.get(TutorPortalService);
    expect(service).toBeTruthy();
  });
});
