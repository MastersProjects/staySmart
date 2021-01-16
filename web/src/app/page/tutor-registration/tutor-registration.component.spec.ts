import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TutorRegistrationComponent} from './tutor-registration.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StepperComponent} from '../stepper/stepper.component';
import * as firebase from 'firebase/app';
import {SharedModule} from '../../shared/shared.module';
import {TestingModule} from '../../testing/testing.module';
import {StaySmartService} from '../../shared/services/stay-smart.service';
import {of, throwError} from 'rxjs';
import {LocationService} from '../../shared/services/location.service';
import Timestamp = firebase.firestore.Timestamp;

describe('TutorRegistrationComponent', () => {
  let component: TutorRegistrationComponent;
  let fixture: ComponentFixture<TutorRegistrationComponent>;
  let staySmartService: StaySmartService;
  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TutorRegistrationComponent,
        StepperComponent
      ],
      imports: [
        TestingModule,
        CdkStepperModule,
        FontAwesomeModule,
        NgbModule,
        SharedModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRegistrationComponent);
    component = fixture.componentInstance;
    staySmartService = TestBed.inject(StaySmartService);
    locationService = TestBed.inject(LocationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registrationForm.invalid).toBeTruthy();
  });

  it('email field validity', () => {
    let errors: {};
    const email = component.registrationForm.get('step1').get('email');

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

  it('mobileNumber field validity', () => {
    let errors: {};
    const phone = component.registrationForm.get('step1').get('mobileNumber');

    // Phone field is required
    errors = phone.errors || {};
    expect(errors[`required`]).toBeTruthy();

    // Set phone to something
    phone.setValue('111111111');
    expect(phone.valid).toBeTruthy();
  });

  it('password field validity', () => {
    const step1 = component.registrationForm.get('step1');
    const password = component.registrationForm.get('step1').get('password');
    const repeatPassword = component.registrationForm.get('step1').get('repeatPassword');

    // password not filled out
    expect(password.errors.required).toBeTruthy();

    // repeatPassword filled out
    expect(repeatPassword.errors.required).toBeTruthy();

    // TODO weak password

    // password valid
    password.setValue('1234567890');
    expect(password.valid).toBeTruthy();

    // repeatPassword not same
    expect(step1.invalid).toBeTruthy();
    expect(step1.errors.notSame).toBeTruthy();

    // repeatPassword valid
    repeatPassword.setValue('1234567890');
    expect(step1.errors).toBeNull();
  });

  it('step1 validity', () => {
    fillStep1();
    expect(component.registrationForm.get('step1').valid).toBeTruthy();
  });

  it('step2 validity', () => {
    fillStep2();
    expect(component.registrationForm.get('step2').valid).toBeTruthy();
  });

  it('step3 validity', () => {
    fillStep3();
    expect(component.registrationForm.get('step3').valid).toBeTruthy();
  });

  it('step4 validity', () => {
    fillStep4();
    expect(component.registrationForm.get('step4').valid).toBeTruthy();
  });

  it('registrationForm validity', () => {
    fillStep1();
    fillStep2();
    fillStep3();
    fillStep4();
    expect(component.registrationForm.valid).toBeTruthy();
  });

  describe('submitForm', () => {
    it('should submit form', fakeAsync(() => {
      fillStep1();
      fillStep2();
      fillStep3();
      fillStep4();
      spyOn(staySmartService, 'registerNewTutor').and.returnValue(of(void 0));

      component.submitForm();
      tick();

      expect(staySmartService.registerNewTutor).toHaveBeenCalled();
      expect(component.submitted).toBeTrue();
    }));

    it('should submit form and handle email already in use', fakeAsync(() => {
      fillStep1();
      fillStep2();
      fillStep3();
      fillStep4();
      spyOn(staySmartService, 'registerNewTutor').and.returnValue(throwError({code: 'auth/email-already-in-use'}));

      component.submitForm();
      tick();

      expect(staySmartService.registerNewTutor).toHaveBeenCalled();
      expect(component.submitted).toBeFalse();
      expect(component.emailAlreadyInUse).toBe('test@example.com');
      expect(component.stepper.selectedIndex).toBe(0);
    }));

    it('should submit form and handle', fakeAsync(() => {
      fillStep1();
      fillStep2();
      fillStep3();
      fillStep4();
      spyOn(staySmartService, 'registerNewTutor').and.returnValue(throwError({code: 'code'}));
      spyOn(console, 'error').and.stub();

      component.submitForm();
      tick();

      expect(staySmartService.registerNewTutor).toHaveBeenCalled();
      expect(component.submitted).toBeFalse();
      expect(component.emailAlreadyInUse).not.toBe('test@example.com');
      expect(console.error).toHaveBeenCalledWith({code: 'code'});
    }));

    it('should not submit on invalid', fakeAsync(() => {
      fillStep1();
      spyOn(staySmartService, 'registerNewTutor').and.returnValue(throwError({code: 'code'}));

      component.submitForm();
      tick();

      expect(staySmartService.registerNewTutor).not.toHaveBeenCalled();
    }));
  });

  describe('onFrontFileChange', () => {
    it('should handle onFrontFileChange', fakeAsync(() => {
      const event = {target: {files: [{name: 'fileName'}]}};

      component.onFrontFileChange(event);

      expect(component.studentCardFrontFileName).toBe('fileName');
      expect(component.registrationForm.get('step3').get('studentCardFront').value).toEqual({name: 'fileName'});
    }));
  });

  describe('onBackFileChange', () => {
    it('should handle onBackFileChange', fakeAsync(() => {
      const event = {target: {files: [{name: 'fileName'}]}};

      component.onBackFileChange(event);

      expect(component.studentCardBackFileName).toBe('fileName');
      expect(component.registrationForm.get('step3').get('studentCardBack').value).toEqual({name: 'fileName'});
    }));
  });

  describe('searchLocation', () => {
    it('should searchLocation', (done) => {
      const geoLocations = [{
        label: 'label',
        detail: 'detail',
        lon: 1,
        lat: 2,
        y: 3,
        x: 4,
        geomStBox2d: 'geomStBox2d',
      }];
      spyOn(locationService, 'searchLocation').and.returnValue(of(geoLocations));

      component.searchLocation(of('text')).subscribe(res => {
        expect(res).toEqual(geoLocations);
        expect(component.searching).toBeFalse();
        done();
      });
    });

    it('should searchLocation and handle error', (done) => {
      spyOn(locationService, 'searchLocation').and.returnValue(throwError({error: 'error'}));

      component.searchLocation(of('text')).subscribe(res => {
        expect(res).toEqual([]);
        expect(component.searchFailed).toBeTrue();
        expect(component.searching).toBeFalse();
        done();
      });
    });
  });

  describe('locationFormatter', () => {
    it('should locationFormatter', () => {
      expect(component.locationFormatter({
        label: 'label',
        detail: 'detail',
        lon: 1,
        lat: 2,
        y: 3,
        x: 4,
        geomStBox2d: 'geomStBox2d',
      })).toBe('label');
    });

    it('should locationFormatter on no label', () => {
      expect(component.locationFormatter({
        detail: 'detail',
        lon: 1,
        lat: 2,
        y: 3,
        x: 4,
        geomStBox2d: 'geomStBox2d',
      } as any)).toBeUndefined();
    });
  });

  describe('locationFormatterForm', () => {
    it('should locationFormatterForm', () => {
      expect(component.locationFormatterForm({
        label: 'label',
        detail: 'detail',
        lon: 1,
        lat: 2,
        y: 3,
        x: 4,
        geomStBox2d: 'geomStBox2d',
      })).toBe('label');
    });

    it('should locationFormatterForm on no label', () => {
      expect(component.locationFormatterForm({
        detail: 'detail',
        lon: 1,
        lat: 2,
        y: 3,
        x: 4,
        geomStBox2d: 'geomStBox2d',
      } as any)).toBeUndefined();
    });
  });

  function fillStep1() {
    component.registrationForm.get('step1').get('firstName').setValue('hans');
    component.registrationForm.get('step1').get('lastName').setValue('noetig');
    component.registrationForm.get('step1').get('email').setValue('test@example.com');
    component.registrationForm.get('step1').get('mobileNumber').setValue('111111111');
    component.registrationForm.get('step1').get('birthday').setValue(
      Timestamp.fromDate(new Date(1998, 6, 6))
    );
    component.registrationForm.get('step1').get('password').setValue('1234567890');
    component.registrationForm.get('step1').get('repeatPassword').setValue('1234567890');
  }

  function fillStep2() {
    component.registrationForm.get('step2').get('streetAddress').setValue('street 26');
    component.registrationForm.get('step2').get('postalCode').setValue('6969');
    component.registrationForm.get('step2').get('location').setValue({
      label: '<b>Dübendorf (ZH)</b>',
      detail: 'duebendorf zh',
      lon: 8.616637229919434,
      lat: 47.38813400268555,
      y: 688943.0625,
      x: 249256.875,
      geomStBox2d: 'BOX(686406.730634135 246884.697158672,691666.601228744 251628.209128328)'
    });
  }

  function fillStep3() {
    component.registrationForm.get('step3').get('studentCardFront')
      .setValue('studentCard/ea03d35a-a3e5-41b6-a341-ccc129c8e760');
    component.registrationForm.get('step3').get('studentCardBack')
      .setValue('studentCard/e5b08a82-cde7-486a-b1b5-0443854e4b82');
    component.registrationForm.get('step3').get('studentCardExpireDate').setValue(new Date());
    component.registrationForm.get('step3').get('education').setValue('some education');
  }

  function fillStep4() {
    component.registrationForm.get('step4').get('subjects').setValue(['Mathe', 'Englisch']);
    component.registrationForm.get('step4').get('gradeLevels').setValue(['4. - 6. Klasse', 'Sekundarstufe']);
    component.registrationForm.get('step4').get('daysAvailable').setValue({
      monday: true, tuesday: false, wednesday: true, thursday: true, friday: true,
      saturday: true, sunday: false
    });
    component.registrationForm.get('step4').get('price').setValue(20);
    component.registrationForm.get('step4').get('attention').setValue('ueber social media');
  }

});
