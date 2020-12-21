import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestDetailComponent} from './tp-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import * as firebase from 'firebase/app';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TestingModule} from '../../testing/testing.module';
import {TutorSearchRequestStatus} from '../../shared/model/tutor-search-request.model';
import Timestamp = firebase.firestore.Timestamp;

describe('TpRequestDetailComponent', () => {
  let component: TpRequestDetailComponent;
  let fixture: ComponentFixture<TpRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  });

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
      status: TutorSearchRequestStatus.NEW,
      point: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
