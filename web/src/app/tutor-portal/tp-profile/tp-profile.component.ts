import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorAuthService} from '../../auth/tutor-auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Tutor} from '../../shared/model/tutor.model';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFirePerformance} from '@angular/fire/performance';
import {locationDomainValidator} from '../../shared/validators/location.validator';
import {GeoLocation} from '../../shared/model/geo-location.model';
import {LocationService} from '../../shared/location.service';

@Component({
  selector: 'app-tp-profile',
  templateUrl: './tp-profile.component.html',
  styleUrls: ['./tp-profile.component.scss']
})
export class TpProfileComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  tutorPortalUser: Tutor;
  profileInfoForm: FormGroup;

  /* Variables location search */
  searching = false;
  searchFailed = false;

  subjectOptions = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // TODO load dynamic not static
  gradeLevelOptions = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // TODO load dynamic not static

  constructor(
    private authService: TutorAuthService,
    private tutorPortalService: TutorPortalService,
    private angularFirePerformance: AngularFirePerformance,
    private locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.profileInfoForm = this.createProfileInfoForm();
    this.loadTutorPortalUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTutorPortalUser() {
    this.authService.tutorPortalUser$.pipe(takeUntil(this.destroy$)).subscribe(tutorPortalUser => {
      this.tutorPortalUser = tutorPortalUser;
      this.profileInfoForm.patchValue(tutorPortalUser);
    });
  }

  async saveProfileInfo() {
    if (this.profileInfoForm.dirty && this.profileInfoForm.valid) {
      const trace = await this.angularFirePerformance.trace('TP: saveProfileInfo');
      trace.start();
      this.tutorPortalService.saveProfileInfo({...this.tutorPortalUser, ...this.profileInfoForm.value})
        .then(() => {
          trace.putAttribute('saveProfileInfoSuccessful', 'true');
          this.profileInfoForm.markAsPristine();
          this.profileInfoForm.markAsUntouched();
        })
        .catch(error => {
          console.error(error);
          trace.putAttribute('saveProfileInfoSuccessful', 'false');
        })
        .finally(() => {
          trace.stop();
        });
    }
  }

  async saveProfilePicture($event: string) {
    const trace = await this.angularFirePerformance.trace('TP: uploadProfilePicture');
    trace.start();
    this.tutorPortalService.uploadProfilePicture($event, this.tutorPortalUser)
      .then(() => {
        console.log('uploaded');
        trace.putAttribute('uploadProfilePictureSuccessful', 'true');
      })
      .catch(error => {
        console.error(error);
        trace.putAttribute('uploadProfilePictureSuccessful', 'false');
      })
      .finally(() => {
        trace.stop();
      });
  }

  private createProfileInfoForm(): FormGroup {
    const profileInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required), // TODO min. age validator?
      streetAddress: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      city: new FormControl('', [Validators.required, locationDomainValidator]),
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
      price: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    profileInfoForm.controls.email.disable();

    return profileInfoForm;
  }

  get firstName(): FormControl {
    return this.profileInfoForm.controls.firstName as FormControl;
  }

  get lastName(): FormControl {
    return this.profileInfoForm.controls.lastName as FormControl;
  }

  get email(): FormControl {
    return this.profileInfoForm.controls.email as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.profileInfoForm.controls.mobileNumber as FormControl;
  }

  get birthday(): FormControl {
    return this.profileInfoForm.controls.birthday as FormControl;
  }

  get streetAddress(): FormControl {
    return this.profileInfoForm.controls.streetAddress as FormControl;
  }

  get postalCode(): FormControl {
    return this.profileInfoForm.controls.postalCode as FormControl;
  }

  get city(): FormControl {
    return this.profileInfoForm.controls.city as FormControl;
  }

  get subjects(): FormControl {
    return this.profileInfoForm.controls.subjects as FormControl;
  }

  get gradeLevels(): FormControl {
    return this.profileInfoForm.controls.gradeLevels as FormControl;
  }

  get monday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('monday') as FormControl;
  }

  get tuesday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('tuesday') as FormControl;
  }

  get wednesday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('wednesday') as FormControl;
  }

  get thursday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('thursday') as FormControl;
  }

  get friday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('friday') as FormControl;
  }

  get saturday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('saturday') as FormControl;
  }

  get sunday(): FormControl {
    return this.profileInfoForm.get('daysAvailable').get('sunday') as FormControl;
  }

  get price(): FormControl {
    return this.profileInfoForm.controls.price as FormControl;
  }

  searchLocation = (text: Observable<string>) =>
    text.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.locationService.searchLocation(term).pipe(
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  locationFormatter = (result: GeoLocation) => result.label ? result.label : null;

  locationFormatterForm = (result: GeoLocation) => result.label ? result.label : null;

}
