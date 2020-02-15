import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TutorPortalRequestOfferFormComponent} from './tutor-portal-request-offer-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule} from '@angular/forms';

describe('TutorPortalRequestAcceptComponent', () => {
  let component: TutorPortalRequestOfferFormComponent;
  let fixture: ComponentFixture<TutorPortalRequestOfferFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule
      ],
      declarations: [ TutorPortalRequestOfferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
