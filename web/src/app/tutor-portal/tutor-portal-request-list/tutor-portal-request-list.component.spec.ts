import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalRequestListComponent} from './tutor-portal-request-list.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TutorPortalRequestDetailComponent} from '../tutor-portal-request-detail/tutor-portal-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalRequestOfferComponent} from '../tutor-portal-request-offer/tutor-portal-request-offer.component';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('TutorPortalRequestListComponent', () => {
  let component: TutorPortalRequestListComponent;
  let fixture: ComponentFixture<TutorPortalRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        TutorPortalRequestListComponent,
        TutorPortalRequestDetailComponent,
        TutorPortalRequestOfferComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});