import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TutorSearchRequestOfferComponent} from '../tutor-search-request-offer/tutor-search-request-offer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('TutorSearchRequestDetailComponent', () => {
  let component: TutorSearchRequestDetailComponent;
  let fixture: ComponentFixture<TutorSearchRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        TutorSearchRequestDetailComponent,
        TutorSearchRequestOfferComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSearchRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
