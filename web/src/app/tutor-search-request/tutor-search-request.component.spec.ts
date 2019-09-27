import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestComponent} from './tutor-search-request.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperComponent} from '../shared/stepper/stepper.component';

describe('TutorSearchRequestComponent', () => {
  let component: TutorSearchRequestComponent;
  let fixture: ComponentFixture<TutorSearchRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FontAwesomeModule,
        CdkStepperModule
      ],
      declarations: [
        TutorSearchRequestComponent,
        StepperComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSearchRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
