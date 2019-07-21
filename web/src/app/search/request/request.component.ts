import {Component, Directive, OnInit} from '@angular/core';
import {GeoLocation, RequestForm} from 'src/app/shared/model/requestForm';
import {Observable, of} from 'rxjs';
import {LocationService} from 'src/app/shared/clients/location.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FormControl, NG_VALIDATORS} from '@angular/forms';
import {domain} from 'process';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  /* Variables for stepper */
  steps: HTMLCollectionOf<Element>;
  progressBars: HTMLCollectionOf<Element>;
  step = 0;

  /* Variables for form */
  submitted = false;
  model: RequestForm = new RequestForm();
  grades = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynmaic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynmaic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  constructor(private locationService: LocationService, private angularFirestore: AngularFirestore) {
  }

  ngOnInit() {
    this.steps = document.getElementsByClassName('step');
    this.progressBars = document.getElementsByClassName('progress');
  }

  // TODO just an example
  requestTutorSearch(requestForm: RequestForm) {
    const request = {
      firstname: requestForm.firstname,
      name: requestForm.name,
      mail: requestForm.mail,
      phone: requestForm.phone,
      subject: requestForm.subject,
      grade: requestForm.grade,
      location: {
        label: requestForm.location.label,
        detail: requestForm.location.detail,
        lon: requestForm.location.lon,
        lat: requestForm.location.lat,
        y: requestForm.location.y,
        x: requestForm.location.x,
        geomStBox2d: requestForm.location.geomStBox2d,
      },
      days: {
        monday: requestForm.days.monday,
        tuesday: requestForm.days.tuesday,
        wednesday: requestForm.days.wednesday,
        thursday: requestForm.days.thursday,
        friday: requestForm.days.friday,
        saturday: requestForm.days.saturday,
        sunday: requestForm.days.sunday
      },
      budget: requestForm.budget,
      problem: requestForm.problem
    };
    this.angularFirestore.collection('TutorSearchRequests').add(request).then(value => {
      console.log(value);
    }).catch(reason => {
      console.log(reason);
    });
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
      check = !!(this.model.firstname && this.model.name && this.model.mail && this.model.phone);
    } else if (step === 1) {
      check = !!(this.model.grade && this.model.subject);
    } else if (step === 2) {
      check = !!(this.model.budget && this.model.problem && this.model.location && (this.model.days.monday || this.model.days.thursday
        || this.model.days.tuesday || this.model.days.wednesday || this.model.days.friday || this.model.days.saturday
        || this.model.days.sunday));
    } // ToDo better day check (this.model.days as Array<boolean>).some(x => x === true)

    return check;
  }

  onSubmit() {
    if (this.formValid(0) && this.formValid(1) && this.formValid(2)) {
      console.log(this.model);
      this.requestTutorSearch(this.model);
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
  providers: [{
    provide: NG_VALIDATORS,
    useValue: locationDomainValidator,
    multi: true
  }
  ]
})
export class LocationDomainValidatorDirective {
}
