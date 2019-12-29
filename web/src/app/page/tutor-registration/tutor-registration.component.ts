import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {repeatPasswordValidator} from '../../shared/validators/repeat-password.validator';
import {locationDomainValidator} from '../../shared/validators/location.validator';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';
import {GeoLocation} from '../../shared/model/geo-location.model';
import {LocationService} from '../../shared/location.service';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment/locale/de-ch';
import {StaySmartService} from '../../shared/stay-smart.service';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TutorRegistrationComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  submitted = false;
  registrationForm: FormGroup;

  /* Variables location search */
  searching = false;
  searchFailed = false;

  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // TODO load dynamic not static
  gradeLevels = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // TODO load dynamic not static

  faCalendar = faCalendar;
  faCheck = faCheck;

  months = moment.months();

  today = new Date();
  studentCardFrontFileName: string;
  studentCardBackFileName: string;

  constructor(private locationService: LocationService, private staySmartService: StaySmartService) {
  }

  ngOnInit() {
    this.registrationForm = this.createForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm() {
    if (this.registrationForm.valid) {

      // TODO start loading circle

      /* this.registrationForm.value has to be StaySmartService.RegistrationForm
      *  TODO refactoring: make that it checks on runtime (maybe use class instead of interface?)
      */
      this.staySmartService.registerNewTutor(this.registrationForm.value).pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          console.log('Registered');
          this.submitted = true;
          // TODO end loading circle
        });
    }
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
    const formMonth = this.registrationForm.get('step1').get('birthday').get('month').value;
    const formYear = this.registrationForm.get('step1').get('birthday').get('year').value;
    const selectedMonth = formMonth ? formMonth : new Date().getMonth() + 1;
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth} ${selectedYear}`, 'MM YYYY').daysInMonth();
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    return days;
  }

  checkMonthDays() {
    const formDay = this.registrationForm.get('step1').get('birthday').get('day').value;
    const formMonth = this.registrationForm.get('step1').get('birthday').get('month').value;
    const formYear = this.registrationForm.get('step1').get('birthday').get('year').value;
    const selectedMonth = formMonth ? formMonth : new Date().getMonth() + 1;
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth} ${selectedYear}`, 'MM YYYY').daysInMonth();
    if (formDay > daysCount) {
      this.registrationForm.get('step1').get('birthday').get('day').setValue(1);
    }
  }

  onFrontFileChange(event) {
    const file: File = event.target.files[0];
    this.studentCardFrontFileName = file.name;
    this.registrationForm.get('step3').get('studentCardFront').setValue(file);
  }

  onBackFileChange(event) {
    const file = event.target.files[0];
    this.studentCardBackFileName = file.name;
    this.registrationForm.get('step3').get('studentCardBack').setValue(file);
  }

  searchLocation = (text: Observable<string>) =>
    text.pipe(
      takeUntil(this.destroy$),
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

  private createForm(): FormGroup {
    /*StaySmartService.RegistrationForm*/
    return new FormGroup({
      step1: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]), // TODO email already in use validator
        mobileNumber: new FormControl(
          '', [Validators.required, Validators.pattern(/^\d{9}$/)]
        ),
        birthday: new FormGroup({
          day: new FormControl('', Validators.required),
          month: new FormControl('', Validators.required),
          year: new FormControl('', Validators.required)
        }), // TODO min. age validator?
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        repeatPassword: new FormControl('', Validators.required)
      }, {validators: repeatPasswordValidator}),
      step2: new FormGroup({
        streetAddress: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        city: new FormControl('', [Validators.required, locationDomainValidator]),
      }),
      step3: new FormGroup({
        studentCardFront: new FormControl(null, Validators.required), // TODO image file validator
        studentCardBack: new FormControl(null, Validators.required), // TODO image file validator
        studentCardExpireDate: new FormControl('', Validators.required), // TODO not expired validator
        education: new FormControl('', Validators.required),
      }),
      step4: new FormGroup({
        subjects: new FormControl('', Validators.required),
        gradeLevels: new FormControl('', Validators.required),
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

}
