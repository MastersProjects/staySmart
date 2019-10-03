import { Component, Directive, OnInit } from '@angular/core';
import { GeoLocation, TutorSearchRequest } from 'src/app/shared/model/tutor-search-request.model';
import { Observable, of } from 'rxjs';
import { LocationService } from 'src/app/shared/location.service';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { FormControl, NG_VALIDATORS, FormGroup, Validators } from '@angular/forms';
import { locationDomainValidator } from '../shared/validators/location-validator';
import { StaySmartService } from '../shared/stay-smart.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tutor-search-request',
  templateUrl: './tutor-search-request.component.html',
  styleUrls: ['./tutor-search-request.component.scss']
})
export class TutorSearchRequestComponent implements OnInit {
  faCheck = faCheck; // Icon
  submitted = false;

  grades = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynamic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynamic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  /* Form */
  requestForm: FormGroup;

  constructor(private locationService: LocationService, private staySmartService: StaySmartService) { }

  ngOnInit() {
    this.requestForm = this.createForm();
  }

  createForm(): FormGroup {
    return new FormGroup({
      general: new FormGroup({
        firstname: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        mail: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)])
      }),
      category: new FormGroup({
        subject: new FormControl('', Validators.required),
        grade: new FormControl('', Validators.required)
      }),
      details: new FormGroup({
        budget: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        problem: new FormControl('', [Validators.required, Validators.minLength(20)]),
        days: new FormGroup({
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
    return !!(this.step3.valid && this.isOneDaySelected(this.step3.get('days').value));
  }

  get step3() {
    return this.requestForm.get('details');
  }

  isOneDaySelected(days: object) {
    const dayList = Object.keys(days).map(i => days[i]);
    return dayList.some(this.isTrue);
  }

  isTrue(element, index, array) {
    return (element);
  }

  onSubmit() {
    if (this.step1Completed && this.step2Completed && this.step3Completed) {
      const tutorSearchRequestData = this.mapFormToModel();
      this.staySmartService.requestTutorSearch(tutorSearchRequestData).then(value => {
        console.log(value);
        this.submitted = true;
      }).catch(reason => {
        console.log(reason);
      });
    } else {
      console.log('Error in Form');
    }
  }

  mapFormToModel() {
    const tutorSearchRequestData: TutorSearchRequest = {
      name: this.step1.get('name').value,
      firstname: this.step1.get('firstname').value,
      mail: this.step1.get('mail').value,
      phone: this.step1.get('phone').value,
      grade: this.step2.get('grade').value,
      subject: this.step2.get('subject').value,
      budget: this.step3.get('budget').value,
      location: this.step3.get('location').value,
      days: this.step3.get('days').value,
      problem: this.step3.get('problem').value,
      timestamp: null
    };
    return tutorSearchRequestData;
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

