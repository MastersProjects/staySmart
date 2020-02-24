import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestDetailComponent} from './tp-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {RouterTestingModule} from '@angular/router/testing';
import Timestamp = firebase.firestore.Timestamp;

describe('TpRequestDetailComponent', () => {
  let component: TpRequestDetailComponent;
  let fixture: ComponentFixture<TpRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFirePerformanceModule,
        AngularFireStorageModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestDetailComponent);
    component = fixture.componentInstance;
    component.tutorSearchRequest = {
      budget: 3,
      daysAvailable: {
        friday: false,
        monday: true,
        saturday: false,
        sunday: false,
        thursday: true,
        tuesday: true,
        wednesday: true
      },
      firstName: 'Chiramet',
      gradeLevel: 'Sekundarstufe',
      lastName: 'Penglerd',
      location: {
        detail: 'bassersdorf zh',
        geomStBox2d: 'BOX(687833.980129667 252878.416508724,692260.698616913 257235.204026835)',
        label: 'Bassersdorf (ZH)',
        lat: 47.44012451171875,
        lon: 8.62594223022461,
        x: 255047.15625,
        y: 689558.0625
      },
      problem: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
      subject: 'Physik',
      timestamp: new Timestamp(1578106112, 229000000),
      status: 'new'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});