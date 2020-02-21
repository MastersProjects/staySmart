import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpDashboardComponent} from './tp-dashboard.component';
import {TpRequestListComponent} from '../tp-request-list/tp-request-list.component';
import {TpRequestDetailComponent} from '../tp-request-detail/tp-request-detail.component';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';

describe('TpDashboardComponent', () => {
  let component: TpDashboardComponent;
  let fixture: ComponentFixture<TpDashboardComponent>;

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
        TpDashboardComponent,
        TpRequestListComponent,
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
