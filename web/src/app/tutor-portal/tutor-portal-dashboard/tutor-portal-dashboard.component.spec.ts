import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalDashboardComponent} from './tutor-portal-dashboard.component';
import {TutorPortalRequestListComponent} from '../tutor-portal-request-list/tutor-portal-request-list.component';
import {TutorPortalRequestDetailComponent} from '../tutor-portal-request-detail/tutor-portal-request-detail.component';
import {TutorPortalRequestOfferComponent} from '../tutor-portal-request-offer/tutor-portal-request-offer.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';

describe('TutorPortalDashboardComponent', () => {
  let component: TutorPortalDashboardComponent;
  let fixture: ComponentFixture<TutorPortalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFirePerformanceModule,
        AngularFireStorageModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        TutorPortalDashboardComponent,
        TutorPortalRequestListComponent,
        TutorPortalRequestDetailComponent,
        TutorPortalRequestOfferComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
