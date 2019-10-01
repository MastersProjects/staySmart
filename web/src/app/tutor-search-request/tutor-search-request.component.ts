import {Component, Directive, OnInit} from '@angular/core';
import {GeoLocation, TutorSearchRequest} from 'src/app/shared/model/tutor-search-request.model';
import {Observable, of} from 'rxjs';
import {LocationService} from 'src/app/shared/location.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FormControl, NG_VALIDATORS, FormGroup, Validators} from '@angular/forms';
import {domain} from 'process';
import {StaySmartService} from '../shared/stay-smart.service';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tutor-search-request',
  templateUrl: './tutor-search-request.component.html',
  styleUrls: ['./tutor-search-request.component.scss']
})
export class TutorSearchRequestComponent implements OnInit {
  faCheck = faCheck;

  /* Variables for stepper */
  steps: HTMLCollectionOf<Element>;
  progressBars: HTMLCollectionOf<Element>;
  step = 0;

  /* Variables for form */
  submitted = false;
  tutorSearchRequest: TutorSearchRequest = {
    firstname: '',
    name: '',
    mail: '',
    phone: '',
    subject: '',
    grade: '',
    location: {
      label: '',
      detail: '',
      lon: 0,
      lat: 0,
      y: 0,
      x: 0,
      geomStBox2d: '',
    },
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    budget: 0,
    problem: '',
    timestamp: null
  };
  grades = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynamic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynamic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  requestForm: FormGroup;


  constructor(private locationService: LocationService, private staySmartService: StaySmartService) {
  }

  ngOnInit() {
    this.steps = document.getElementsByClassName('step');
    this.progressBars = document.getElementsByClassName('progress');


    this.requestForm = new FormGroup({
      general: new FormGroup({
        firstname: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        mail: new FormControl('' , [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}/)])
      }),
      category: new FormGroup({
        subject: new FormControl('', Validators.required),
        grade: new FormControl('', Validators.required)
      })
  });
  }

  get step1Completed() {
    return !!(this.step1.valid);
  }

  get step1() {
    return this.requestForm.get('general');
  }

  get step2Completed() {
    return !!(this.step2.valid);
  }

  get step2() {
    return this.requestForm.get('category');
  }

  get step3Completed() {
    return !!(this.tutorSearchRequest.budget
      && this.tutorSearchRequest.problem
      && this.tutorSearchRequest.location
      && (this.tutorSearchRequest.days.monday
        || this.tutorSearchRequest.days.thursday
        || this.tutorSearchRequest.days.tuesday
        || this.tutorSearchRequest.days.wednesday
        || this.tutorSearchRequest.days.friday
        || this.tutorSearchRequest.days.saturday
        || this.tutorSearchRequest.days.sunday
      )
    );
  }

  onSubmit() {
    if (this.step1Completed && this.step2Completed && this.step3Completed) {
      console.log(this.tutorSearchRequest);
      this.staySmartService.requestTutorSearch(this.tutorSearchRequest).then(value => {
        console.log(value);
        this.submitted = true;
      }).catch(reason => {
        console.log(reason);
      });
    } else {
      console.log('Error in Form');
    }
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

  locationFormatter = (result: GeoLocation) => result.label.replace(/<[^>]*>/g, '');
  locationFormatterForm = (result: GeoLocation) => result.label = result.label.replace(/<[^>]*>/g, '');
}

export function locationDomainValidator(control: FormControl) {
  const location = control.value;
  if (!(location && location.label && location.detail && location.lon && location.lat && location.x
    && location.y && location.geomStBox2d)) {
    return {
      locationDomain: {
        parsedDomain: domain
      }
    };
  }
  return null;
}

@Directive({
  selector: '[appLocationDomain]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: locationDomainValidator,
      multi: true
    }
  ]
})
export class LocationDomainValidatorDirective {
}
