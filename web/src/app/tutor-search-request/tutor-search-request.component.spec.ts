import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestComponent} from './tutor-search-request.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
        CdkStepperModule,
        ReactiveFormsModule
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

  // General
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.requestForm.valid).toBeFalsy();
  });

  // Step 1
  it('email field validity', () => {
    let errors: {};
    const email = component.step1.get('email');

    // Email field is required
    errors = email.errors || {};
    expect(errors[`required`]).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors[`required`]).toBeFalsy();
    expect(errors[`email`]).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors[`required`]).toBeFalsy();
    expect(errors[`email`]).toBeFalsy();

    // Field should be ok
    expect(email.valid).toBeTruthy();
  });

  it('phone field validity', () => {
    let errors: {};
    const phone = component.step1.get('phoneNumber');

    // Phone field is required
    errors = phone.errors || {};
    expect(errors[`required`]).toBeTruthy();

    // Set phone to something
    phone.setValue('111111111');
    expect(phone.valid).toBeTruthy();
  });

  it('phone field validity', () => {
    let errors: {};
    const phone = component.step1.get('phoneNumber');

    // Phone field is required
    errors = phone.errors || {};
    expect(errors[`required`]).toBeTruthy();

    //  Number to short
    phone.setValue('1');
    expect(phone.valid).toBeFalsy();

    // Number to long
    phone.setValue('111111111111111111');
    expect(phone.valid).toBeFalsy();

    // Set phone to something valid
    phone.setValue('111111111');
    expect(phone.valid).toBeTruthy();
  });

  it('step one validity', () => {
    component.step1.get('phoneNumber').setValue('111111111');
    component.step1.get('email').setValue('test@example.com');
    component.step1.get('lastName').setValue('test');
    component.step1.get('firstName').setValue('muster');
    expect(component.isStep1Valid).toBeTruthy();
  });

  // Step two
  it('step two validity', () => {
    component.step2.get('subject').setValue('Physics');
    component.step2.get('gradeLevel').setValue('4. - 6. Klasse');
    expect(component.isStep2Valid).toBeTruthy();
  });

  // Step 3
  it('budget field validity', () => {
    let errors: {};
    const budget = component.step3.get('budget');

    // budget field is required
    errors = budget.errors || {};
    expect(errors[`required`]).toBeTruthy();

    // Set budget to something invalid
    budget.setValue('no number');
    expect(budget.valid).toBeFalsy();

    // Set budget to something valid
    budget.setValue('35');
    expect(budget.valid).toBeTruthy();
  });

  it('location field validity', () => {

  });

  it('problem field validity', () => {
    let errors: {};
    const problem = component.step3.get('problem');

    // budget field is required
    errors = problem.errors || {};
    expect(errors[`required`]).toBeTruthy();

    // Set problem to short
    problem.setValue('problem');
    expect(problem.valid).toBeFalsy();

    // Set budget to something valid
    problem.setValue('Lorem Impsum dolor sit amet');
    expect(problem.valid).toBeTruthy();
  });

  it('one day selected', () => {
   let days = {monday: null, tuesday: false, wednesday: false, thursday: false, friday: false,
    saturday: false, sunday: false};
   expect(component.isOneDaySelected(days)).toBeFalsy();

   days = {monday: true, tuesday: true, wednesday: false, thursday: false, friday: false,
    saturday: false, sunday: false};
   expect(component.isOneDaySelected(days)).toBeTruthy();
  });

  it('step three validity', () => {
    fillFormValid();
    expect(component.isStep3Valid).toBeTruthy();
  });

  // ToDo Location search
  it('search location', () => {

  });

  // ToDo
  it('should call submit', () => {
    /*spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);*/
  });

  // ToDo
  it('should submit', () => {
    /*fillFormValid();
    component.onSubmit();
    expect(component.submitted).toBeTruthy();*/
  });

  function fillFormValid() {
    component.step1.get('lastName').setValue('Muster');
    component.step1.get('firstName').setValue('Max');
    component.step1.get('email').setValue('muster@test.ch');
    component.step1.get('phoneNumber').setValue('111111111');
    component.step2.get('gradeLevel').setValue('Gymnasium');
    component.step2.get('subject').setValue('Mathe');
    component.step3.get('budget').setValue('35');
    component.step3.get('problem').setValue('aaaaaaaaaaaaaaaaaaaa');
    component.step3.get('location').setValue({
      label: '<b>Dübendorf (ZH)</b>',
      detail: 'duebendorf zh',
      lon: 8.616637229919434,
      lat: 47.38813400268555,
      y: 688943.0625,
      x: 249256.875,
      geomStBox2d: 'BOX(686406.730634135 246884.697158672,691666.601228744 251628.209128328)'
    });
    component.step3.get('daysAvailable').setValue({
      monday: true, tuesday: false, wednesday: true, thursday: true, friday: true,
      saturday: true, sunday: false
    });
  }
});
