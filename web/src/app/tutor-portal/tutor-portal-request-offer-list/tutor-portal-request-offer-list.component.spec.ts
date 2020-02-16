import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalRequestOfferListComponent} from './tutor-portal-request-offer-list.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';

describe('TutorPortalRequestOfferListComponent', () => {
  let component: TutorPortalRequestOfferListComponent;
  let fixture: ComponentFixture<TutorPortalRequestOfferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirePerformanceModule
      ],
      declarations: [TutorPortalRequestOfferListComponent],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
