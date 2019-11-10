import {Component, OnInit} from '@angular/core';
import {GeoLocation, TutorSearchRequest} from 'src/app/shared/model/tutor-search-request.model';
import {Observable, of} from 'rxjs';
import {LocationService} from 'src/app/shared/location.service';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {locationDomainValidator} from '../shared/validators/location-validator';
import {StaySmartService} from '../shared/stay-smart.service';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tutor-search-request',
  templateUrl: './tutor-search-request.component.html',
  styleUrls: ['./tutor-search-request.component.scss']
})
export class TutorSearchRequestComponent implements OnInit {
  faCheck = faCheck; // Icon
  submitted = false;

  gradeLevels = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynamic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynamic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  /* Form */
  requestForm: FormGroup;

  constructor(private locationService: LocationService, private staySmartService: StaySmartService) {
  }

  ngOnInit() {
    this.requestForm = this.createForm();
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

  submitForm() {
    if (this.isStep1Valid && this.isStep2Valid && this.isStep3Valid) {
      const tutorSearchRequest = this.mapFormToModel();
      Promise.all(this.staySmartService.requestTutorSearch(tutorSearchRequest)).then(value => {
        console.log(value);
        this.submitted = true;
      }).catch(reason => {
        console.log(reason);
      });
    } else {
      console.log('Error in Form');
    }
  }

  mapFormToModel(): TutorSearchRequest {
    return {
      tutorSearchRequestData: {
        lastName: this.step1.get('lastName').value,
        firstName: this.step1.get('firstName').value,
        gradeLevel: this.step2.get('gradeLevel').value,
        subject: this.step2.get('subject').value,
        budget: this.step3.get('budget').value,
        location: this.step3.get('location').value,
        daysAvailable: this.step3.get('daysAvailable').value,
        problem: this.step3.get('problem').value,
        timestamp: null
      },
      tutorSearchRequestContactData: {
        email: this.step1.get('email').value,
        phoneNumber: '41' + this.step1.get('phoneNumber').value
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
      return result.label.replace(/<[^>]*>/g, '');
    }
  }

  locationFormatterForm = (result: GeoLocation) => {
    if (result.label) {
      return result.label.replace(/<[^>]*>/g, '');
    }
  }
}

