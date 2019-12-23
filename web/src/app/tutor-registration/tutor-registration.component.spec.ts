import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorRegistrationComponent} from './tutor-registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StepperComponent} from '../shared/stepper/stepper.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

describe('TutorRegistrationComponent', () => {
  let component: TutorRegistrationComponent;
  let fixture: ComponentFixture<TutorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TutorRegistrationComponent,
        StepperComponent
      ],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        CdkStepperModule,
        FontAwesomeModule,
        NgbModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
