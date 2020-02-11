import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {AppRoutingModule} from '../../app-routing.module';
import {TutorSearchRequestComponent} from '../tutor-search-request/tutor-search-request.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorRegistrationComponent} from '../tutor-registration/tutor-registration.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StepperComponent} from '../../shared/stepper/stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        CdkStepperModule,
        ReactiveFormsModule
      ],
      declarations: [
        HomeComponent,
        TutorSearchRequestComponent,
        TutorRegistrationComponent,
        StepperComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
