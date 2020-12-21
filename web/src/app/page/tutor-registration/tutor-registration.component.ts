import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {repeatPasswordValidator} from '../../shared/validators/repeat-password.validator';
import {locationDomainValidator} from '../../shared/validators/location.validator';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {GeoLocation} from '../../shared/model/geo-location.model';
import {LocationService} from '../../shared/services/location.service';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import 'moment/locale/de-ch';
import {StaySmartService} from '../../shared/services/stay-smart.service';
import {StepperComponent} from '../stepper/stepper.component';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Configuration} from '../../shared/model/configuration.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TutorRegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: StepperComponent;

  destroy$ = new Subject<void>();

  submitted = false;
  registrationForm: FormGroup;

  /* Variables location search */
  searching = false;
  searchFailed = false;

  configuration$: Observable<Configuration>;

  faCalendar = faCalendar;
  faCheck = faCheck;

  months = moment.months();

  studentCardFrontFileName: string;
  studentCardBackFileName: string;

  emailAlreadyInUse = '';

  readonly DROPDOWN_SETTINGS: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Alle selektieren',
    unSelectAllText: 'Alle unselektieren',
    searchPlaceholderText: 'Suchen',
    noDataAvailablePlaceholderText: 'Keine Daten',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    clearSearchFilter: true
  };

  constructor(
    private locationService: LocationService,
    private staySmartService: StaySmartService,
    private configurationService: ConfigurationService,
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.createForm();
    this.configuration$ = this.configurationService.getConfiguration().pipe(shareReplay(1));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      /* this.registrationForm.value has to be StaySmartService.RegistrationForm
      *  TODO refactoring: make that it checks on runtime (maybe use class instead of interface?)
      */
      this.staySmartService.registerNewTutor(this.registrationForm.value).pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            console.log('Registered');
            this.submitted = true;
          },
          error => {
            if (error.code === 'auth/email-already-in-use') {
              this.emailAlreadyInUse = this.registrationForm.get('step1').get('email').value;
              this.stepper.selectedIndex = 0;
            } else {
              console.error(error);
            }
          }
        );
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
      return result.label;
    }
  }

  locationFormatterForm = (result: GeoLocation) => {
    if (result.label) {
      return result.label;
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
        birthday: new FormControl('', Validators.required), // TODO min. age validator?
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        repeatPassword: new FormControl('', Validators.required)
      }, {validators: repeatPasswordValidator}),
      step2: new FormGroup({
        streetAddress: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required),
        location: new FormControl('', [Validators.required, locationDomainValidator]),
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
