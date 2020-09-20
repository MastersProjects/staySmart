import {Component, OnInit} from '@angular/core';
import {TutorSearchRequest, TutorSearchRequestStatus} from 'src/app/shared/model/tutor-search-request.model';
import {Observable, of} from 'rxjs';
import {LocationService} from 'src/app/shared/services/location.service';
import {catchError, debounceTime, distinctUntilChanged, shareReplay, switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {locationDomainValidator} from '../../shared/validators/location.validator';
import {StaySmartService} from '../../shared/services/stay-smart.service';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {GeoLocation} from '../../shared/model/geo-location.model';
import {AngularFirePerformance} from '@angular/fire/performance';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Configuration} from '../../shared/model/configuration.model';

@Component({
  selector: 'app-tutor-search-request',
  templateUrl: './tutor-search-request.component.html',
  styleUrls: ['./tutor-search-request.component.scss']
})
export class TutorSearchRequestComponent implements OnInit {
  faCheck = faCheck; // Icon
  submitted = false;


  /* Variables location search */
  searching = false;
  searchFailed = false;

  configuration$: Observable<Configuration>;

  /* Form */
  requestForm: FormGroup;

  constructor(
    private locationService: LocationService,
    private staySmartService: StaySmartService,
    private angularFirePerformance: AngularFirePerformance,
    private configurationService: ConfigurationService,
  ) {
  }

  ngOnInit() {
    this.requestForm = this.createForm();
    this.configuration$ = this.configurationService.getConfiguration().pipe(shareReplay(1));
  }

  createForm(): FormGroup {
    return new FormGroup({
      general: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)])
      }),
      category: new FormGroup({
        subject: new FormControl('', Validators.required),
        gradeLevel: new FormControl('', Validators.required)
      }),
      details: new FormGroup({
        budget: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        problem: new FormControl('', [Validators.required, Validators.minLength(20)]),
        daysAvailable: new FormGroup({
          monday: new FormControl(false),
          tuesday: new FormControl(false),
          wednesday: new FormControl(false),
          thursday: new FormControl(false),
          friday: new FormControl(false),
          saturday: new FormControl(false),
          sunday: new FormControl(false)
        }),
        location: new FormControl('', [Validators.required, locationDomainValidator])
      }),
    });
  }

  get isStep1Valid(): boolean {
    return this.step1.valid;
  }

  get isStep2Valid(): boolean {
    return this.step2.valid;
  }

  get isStep3Valid(): boolean {
    return this.step3.valid && this.isOneDaySelected(this.step3.get('daysAvailable').value);
  }

  get step1() {
    return this.requestForm.get('general');
  }

  get step2() {
    return this.requestForm.get('category');
  }

  get step3() {
    return this.requestForm.get('details');
  }

  isOneDaySelected(days: object): boolean {
    const dayList = Object.keys(days).map(i => days[i]);
    return dayList.some(this.isTrue);
  }

  isTrue(element): boolean {
    return element;
  }

  async submitForm() {
    if (this.isStep1Valid && this.isStep2Valid && this.isStep3Valid) {
      const tutorSearchRequest = this.mapFormToModel();
      const trace = await this.angularFirePerformance.trace('requestTutorSearch');
      trace.start();
      this.staySmartService.requestTutorSearch(tutorSearchRequest)
        .then(() => {
          this.submitted = true;
          trace.putAttribute('requestTutorSearchSuccessful', 'true');
        })
        .catch(reason => {
          console.log(reason);
          trace.putAttribute('requestTutorSearchSuccessful', 'false');
        })
        .finally(() => {
          trace.stop();
        });
    } else {
      console.log('Error in Form');
    }
  }

  mapFormToModel(): TutorSearchRequest {
    const {lastName, firstName, email, phoneNumber} = this.step1.value;
    const {gradeLevel, subject} = this.step2.value;
    const {budget, location, daysAvailable, problem} = this.step3.value;
    return {
      tutorSearchRequestData: {
        lastName,
        firstName,
        gradeLevel,
        subject,
        budget,
        location,
        daysAvailable,
        problem,
        timestamp: null,
        status: TutorSearchRequestStatus.NEW,
        point: null
      },
      tutorSearchRequestContactData: {
        email,
        phoneNumber
      }
    };
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
      return result.label;
    }
  }

  locationFormatterForm = (result: GeoLocation) => {
    if (result.label) {
      return result.label;
    }
  }
}

