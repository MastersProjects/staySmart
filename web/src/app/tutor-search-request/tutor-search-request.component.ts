import {Component, Directive, OnInit} from '@angular/core';
import {GeoLocation, TutorSearchRequest} from 'src/app/shared/model/tutor-search-request.model';
import {Observable, of} from 'rxjs';
import {LocationService} from 'src/app/shared/location.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FormControl, NG_VALIDATORS} from '@angular/forms';
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
  grades = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynmaic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynmaic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  constructor(private locationService: LocationService, private staySmartService: StaySmartService) {
  }

  ngOnInit() {
    this.steps = document.getElementsByClassName('step');
    this.progressBars = document.getElementsByClassName('progress');
  }

  prevStep() {
    if (this.step > 0) {
      this.progressBars[this.step - 1].classList.remove('complete');
      this.steps[this.step].className = 'step';

      const formElementNow = document.getElementById('f' + (this.step + 1));
      const formElementNext = document.getElementById('f' + this.step);

      formElementNow.style.display = 'none';
      formElementNext.style.display = 'block';

      this.step -= 1;
      this.steps[this.step].className = 'step active-step';
    }
  }

  nextStep() {
    if (this.step < this.steps.length - 1) {
      if (this.formValid(this.step)) {
        this.progressBars[this.step].classList.add('complete');
        this.step += 1;

        const formElementNow = document.getElementById('f' + this.step);
        const formElementNext = document.getElementById('f' + (this.step + 1));

        formElementNow.style.display = 'none';
        formElementNext.style.display = 'block';

        this.steps[this.step].className = 'step active-step';
      } else {
        console.log('Form invalid for next step!'); // ToDo Error message
      }
    }
  }

  formValid(step: number): boolean {
    let check = false;
    if (step === 0) {
      check = !!(this.tutorSearchRequest.firstname
        && this.tutorSearchRequest.name
        && this.tutorSearchRequest.mail
        && this.tutorSearchRequest.phone
      );
    } else if (step === 1) {
      check = !!(this.tutorSearchRequest.grade && this.tutorSearchRequest.subject);
    } else if (step === 2) {
      check = !!(this.tutorSearchRequest.budget
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
    } // ToDo better day check (this.model.days as Array<boolean>).some(x => x === true)

    return check;
  }

  onSubmit() {
    if (this.formValid(0) && this.formValid(1) && this.formValid(2)) {
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
  locationFomratterForm = (result: GeoLocation) => result.label = result.label.replace(/<[^>]*>/g, '');
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
