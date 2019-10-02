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

  constructor(private locationService: LocationService, private staySmartService: StaySmartService) {}

  ngOnInit() {
    this.requestForm = new FormGroup({
      general: new FormGroup({
        firstname: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        mail: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/\d{9}/), Validators.maxLength(9)])
      }),
      category: new FormGroup({
        subject: new FormControl('', Validators.required),
        grade: new FormControl('', Validators.required)
      }),
      details: new FormGroup({
        budget: new FormControl('', Validators.required),
        problem: new FormControl('', [Validators.required, Validators.minLength(20)]),
        days: new FormGroup({
          monday: new FormControl(),
          tuesday: new FormControl(),
          wednesday: new FormControl(),
          thursday: new FormControl(),
          friday: new FormControl(),
          saturday: new FormControl(),
          sunday: new FormControl()
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
    return !!(this.step2.valid && this.isOneDaySelected);
  }

  get step3() {
    return this.requestForm.get('details');
  }

  get isOneDaySelected() {
    return false; // ToDo day validation
  }

  onSubmit() {
    /*if (this.step1Completed && this.step2Completed && this.step3Completed) {
      console.log(this.tutorSearchRequest);
      this.staySmartService.requestTutorSearch(this.tutorSearchRequest).then(value => {
        console.log(value);
        this.submitted = true;
      }).catch(reason => {
        console.log(reason);
      });
    } else {
      console.log('Error in Form');
    }*/
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

