import {TestBed} from '@angular/core/testing';

import {StaySmartService} from './stay-smart.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('StaySmartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireAuthModule,
      AngularFirePerformanceModule
    ],
  }));

  it('should be created', () => {
    const service: StaySmartService = TestBed.get(StaySmartService);
    expect(service).toBeTruthy();
  });
});
