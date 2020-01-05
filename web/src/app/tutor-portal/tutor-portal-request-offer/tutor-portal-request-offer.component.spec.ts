import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TutorPortalRequestOfferComponent} from './tutor-portal-request-offer.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule} from '@angular/forms';

describe('TutorPortalRequestAcceptComponent', () => {
  let component: TutorPortalRequestOfferComponent;
  let fixture: ComponentFixture<TutorPortalRequestOfferComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule
      ],
      declarations: [ TutorPortalRequestOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
