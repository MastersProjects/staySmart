import {inject, TestBed} from '@angular/core/testing';

import {TutorPortalAuthGuard} from './tutor-portal-auth.guard';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('PortalAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule
      ],
      providers: [TutorPortalAuthGuard]
    });
  });

  it('should ...', inject([TutorPortalAuthGuard], (guard: TutorPortalAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
