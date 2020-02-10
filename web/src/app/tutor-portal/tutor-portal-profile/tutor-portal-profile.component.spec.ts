import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalProfileComponent} from './tutor-portal-profile.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TutorPortalProfilePictureComponent} from '../tutor-portal-profile-picture/tutor-portal-profile-picture.component';

describe('TutorPortalProfileComponent', () => {
  let component: TutorPortalProfileComponent;
  let fixture: ComponentFixture<TutorPortalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFirePerformanceModule,
        AngularFireStorageModule,
      ],
      declarations: [
        TutorPortalProfileComponent,
        TutorPortalProfilePictureComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
