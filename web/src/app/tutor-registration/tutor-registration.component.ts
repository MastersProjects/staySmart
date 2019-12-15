import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {repeatPasswordValidator} from '../shared/validators/repeat-password.validator';
import {locationDomainValidator} from '../shared/validators/location.validator';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';
import {GeoLocation} from '../shared/model/geo-location.model';
import {LocationService} from '../shared/location.service';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment/locale/de-ch';
import {StaySmartService} from '../shared/stay-smart.service';
import {TutorRegistration} from '../shared/model/tutor-registration.model';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TutorRegistrationComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  submitted = false;
  registerForm: FormGroup;

  /* Variables location search */
  searching = false;
  searchFailed = false;

  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // TODO load dynamic not static
  gradeLevels = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // TODO load dynamic not static

  faCalendar = faCalendar;

  months = moment.months();

  today = new Date();
  studentCardFrontFileName: string;
  studentCardBackFileName: string;


  constructor(private locationService: LocationService, private staySmartService: StaySmartService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.createForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      step1: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobileNumber: new FormControl(
          '', [Validators.required, Validators.pattern(/^\d{9}$/)]
        ),
        birthday: new FormGroup({
          day: new FormControl('', Validators.required),
          month: new FormControl('', Validators.required),
          year: new FormControl('', Validators.required)
        }), // TODO min. age validator?
        password: new FormControl('', Validators.required), // TODO password secure validator
        repeatPassword: new FormControl('', Validators.required)
      }, {validators: repeatPasswordValidator}),
      step2: new FormGroup({
        streetAddress: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        city: new FormControl('', [Validators.required, locationDomainValidator]),
      }),
      step3: new FormGroup({
        studentCardFront: new FormControl('', Validators.required),
        studentCardBack: new FormControl('', Validators.required),
        studentCardExpireDate: new FormControl('', Validators.required), // TODO not expired validator
        education: new FormControl('', Validators.required),
      }),
      step4: new FormGroup({
        subjects: new FormControl('', Validators.required),
        gradeLevel: new FormControl('', Validators.required),
        daysAvailable: new FormGroup({
          monday: new FormControl(false),
          tuesday: new FormControl(false),
          wednesday: new FormControl(false),
          thursday: new FormControl(false),
          friday: new FormControl(false),
          saturday: new FormControl(false),
          sunday: new FormControl(false)
        }, {validators: Validators.required}),
        price: new FormControl('', Validators.required),
        attention: new FormControl('')
      })
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      const tutorRegistration = this.getModelFromForm();
      this.authService.registerNewTutor(
        tutorRegistration,
        this.registerForm.get('step1').get('password').value
      ).subscribe(() => {
        console.log('Registered');
      });
    }
  }

  private getModelFromForm(): TutorRegistration {
    const birthday = this.registerForm.get('step1').get('birthday').value;
    return {
      uid: '',
      firstName: this.registerForm.get('step1').get('firstName').value,
      lastName: this.registerForm.get('step1').get('lastName').value,
      email: this.registerForm.get('step1').get('email').value,
      mobileNumber: this.registerForm.get('step1').get('mobileNumber').value,
      birthday: new Date(birthday.year, birthday.month - 1, birthday.day),

      streetAddress: this.registerForm.get('step2').get('streetAddress').value,
      postalCode: this.registerForm.get('step2').get('postalCode').value,
      city: this.registerForm.get('step2').get('city').value,

      studentCardFront: this.registerForm.get('step3').get('studentCardFront').value,
      studentCardBack: this.registerForm.get('step3').get('studentCardBack').value,
      studentCardExpireDate: this.registerForm.get('step3').get('studentCardExpireDate').value,
      education: this.registerForm.get('step3').get('education').value,

      subjects: this.registerForm.get('step4').get('subjects').value,
      gradeLevel: this.registerForm.get('step4').get('gradeLevel').value,
      daysAvailable: this.registerForm.get('step4').get('daysAvailable').value,
      price: this.registerForm.get('step4').get('price').value,
      attention: this.registerForm.get('step4').get('attention').value,

      status: 'new',
    };
  }

  get years() {
    const startYear = 1900;
    let currentYear = new Date().getFullYear();
    const years = [];
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  get days() {
    const days = [];
    const formMonth = this.registerForm.get('step1').get('birthday').get('month').value;
    const formYear = this.registerForm.get('step1').get('birthday').get('year').value;
    const selectedMonth = formMonth ? formMonth : new Date().getMonth() + 1;
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth} ${selectedYear}`, 'MM YYYY').daysInMonth();
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    return days;
  }

  checkMonthDays() {
    const formDay = this.registerForm.get('step1').get('birthday').get('day').value;
    const formMonth = this.registerForm.get('step1').get('birthday').get('month').value;
    const formYear = this.registerForm.get('step1').get('birthday').get('year').value;
    const selectedMonth = formMonth ? formMonth : new Date().getMonth() + 1;
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth} ${selectedYear}`, 'MM YYYY').daysInMonth();
    if (formDay > daysCount) {
      this.registerForm.get('step1').get('birthday').get('day').setValue(1);
    }
  }

  // FIXME upload when regsiter
  onFrontFileChange(event) {
    const file = event.target.files[0];
    this.studentCardFrontFileName = file.name;
    this.staySmartService.uploadStudentCard(event.target.files[0]).pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const uploadPercentage = (response.bytesTransferred / response.totalBytes) * 100;
        console.log(uploadPercentage);
        if (uploadPercentage === 100) {
          console.log('success!');
          console.log(response);
          this.registerForm.get('step3').get('studentCardFront').setValue(response.ref.fullPath);
        }
      });
  }

  // FIXME upload when regsiter
  onBackFileChange(event) {
    const file = event.target.files[0];
    this.studentCardBackFileName = file.name;
    this.staySmartService.uploadStudentCard(event.target.files[0]).pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const uploadPercentage = (response.bytesTransferred / response.totalBytes) * 100;
        console.log(uploadPercentage);
        if (uploadPercentage === 100) {
          console.log('success!');
          console.log(response);
          this.registerForm.get('step3').get('studentCardBack').setValue(response.ref.fullPath);
        }
      });
  }

  searchLocation = (text: Observable<string>) =>
    text.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.locationService.searchLocation(term).pipe(
          tap(e => console.log(e)),
          catchError(() => {
            this.searchFailed = true;
            console.log('Search failed');
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )


  locationFormatter = (result: GeoLocation) => {
    if (result.label) {
      return result.label.replace(/<[^>]*>/g, '');
    }
  }

  locationFormatterForm = (result: GeoLocation) => {
    if (result.label) {
      return result.label.replace(/<[^>]*>/g, '');
    }
  }


}
