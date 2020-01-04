import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalRequestDetailComponent} from './tutor-portal-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import Timestamp = firebase.firestore.Timestamp;

describe('TutorPortalRequestDetailComponent', () => {
  let component: TutorPortalRequestDetailComponent;
  let fixture: ComponentFixture<TutorPortalRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [TutorPortalRequestDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestDetailComponent);
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
      timestamp: new Timestamp(1578106112, 229000000)
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
