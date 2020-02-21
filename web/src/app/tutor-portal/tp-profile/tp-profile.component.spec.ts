import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpProfileComponent} from './tp-profile.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TpProfilePictureComponent} from '../tp-profile-picture/tp-profile-picture.component';

describe('TpProfileComponent', () => {
  let component: TpProfileComponent;
  let fixture: ComponentFixture<TpProfileComponent>;

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
        TpProfileComponent,
        TpProfilePictureComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
