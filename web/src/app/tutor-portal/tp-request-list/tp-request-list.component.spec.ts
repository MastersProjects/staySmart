import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestListComponent} from './tp-request-list.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TpRequestDetailComponent} from '../tp-request-detail/tp-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireStorageModule} from '@angular/fire/storage';

describe('TpRequestListComponent', () => {
  let component: TpRequestListComponent;
  let fixture: ComponentFixture<TpRequestListComponent>;

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
        TpRequestListComponent,
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
