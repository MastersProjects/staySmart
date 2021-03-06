import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {Observable, of, Subject} from 'rxjs';
import {Tutor, TutorStatus} from '../../../shared/model/tutor.model';
import {shareReplay, switchMap, takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {getProfilePicture} from 'src/app/shared/utils.functions';
import {GeoLocation} from '../../../shared/model/geo-location.model';
import {AngularFirePerformance} from '@angular/fire/performance';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {Configuration} from '../../../shared/model/configuration.model';
import {ConfigurationService} from '../../../shared/services/configuration.service';

@Component({
  selector: 'app-ap-tutor-detail',
  templateUrl: './ap-tutor-detail.component.html',
  styleUrls: ['./ap-tutor-detail.component.scss']
})
export class ApTutorDetailComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  tutorDetail: Tutor;
  tutorDetailForm: FormGroup;
  tutorStatus = TutorStatus;

  configuration$: Observable<Configuration>;

  getProfilePicture = getProfilePicture;

  faCheckCircle = faCheckCircle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminPortalService: AdminPortalService,
    private angularFirePerformance: AngularFirePerformance,
    private configurationService: ConfigurationService,
  ) {
  }

  ngOnInit(): void {
    this.tutorDetailForm = this.createTutorDetailForm();
    this.loadTutor();
    this.configuration$ = this.configurationService.getConfiguration().pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTutor() {
    this.activatedRoute.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap((params: ParamMap) => this.adminPortalService.getTutor(params.get('uid')))
    ).subscribe(tutor => {
      console.log(tutor);
      this.tutorDetail = tutor;
      this.tutorDetailForm.patchValue(tutor || {});
    });
  }

  async activateTutor() {
    const trace = await this.angularFirePerformance.trace('AP: activateTutor');
    trace.start();
    this.adminPortalService.activateTutor(this.tutorDetail)
      .then(() => {
        console.log('activated');
        trace.putAttribute('activateTutorSuccessful', 'true');
      })
      .catch(error => {
        console.error(error);
        trace.putAttribute('activateTutorSuccessful', 'false');
      })
      .finally(() => {
        trace.stop();
      });
  }

  async changeStatus($event: Event) {
    const changedStatus = ($event.target as HTMLInputElement).checked ? TutorStatus.ACTIVATED : TutorStatus.DEACTIVATED;
    const trace = await this.angularFirePerformance.trace('AP: changeTutorStatus');
    trace.putAttribute('changedTutorStatus', changedStatus);
    trace.start();
    this.adminPortalService.changeTutorStatus(changedStatus, this.tutorDetail.uid)
      .then(() => {
        trace.putAttribute('changeTutorStatusSuccessful', 'true');
      })
      .catch(error => {
        console.error(error);
        trace.putAttribute('changeTutorStatusSuccessful', 'false');
      })
      .finally(() => {
        trace.stop();
      });
  }

  async changeVerification($event: Event) {
    const isVerified = ($event.target as HTMLInputElement).checked;
    const trace = await this.angularFirePerformance.trace('AP: changeTutorVerification');
    trace.putAttribute('isVerified', String(isVerified));
    trace.start();
    this.adminPortalService.changeTutorVerification(isVerified, this.tutorDetail)
      .then(() => {
        trace.putAttribute('changeTutorVerificationSuccessful', 'true');
      })
      .catch(error => {
        console.error(error);
        trace.putAttribute('changeTutorVerificationSuccessful', 'false');
      })
      .finally(() => {
        trace.stop();
      });
  }

  private createTutorDetailForm(): FormGroup {
    const form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl(''),
      birthday: new FormControl(''),
      streetAddress: new FormControl(''),
      postalCode: new FormControl(''),
      city: new FormControl(''),
      subjects: new FormControl(''),
      gradeLevels: new FormControl(''),
      daysAvailable: new FormGroup({
        monday: new FormControl(false),
        tuesday: new FormControl(false),
        wednesday: new FormControl(false),
        thursday: new FormControl(false),
        friday: new FormControl(false),
        saturday: new FormControl(false),
        sunday: new FormControl(false)
      }),
      price: new FormControl(''),
    });

    form.disable();
    form.controls.daysAvailable.enable();

    return form;
  }

  get firstName(): FormControl {
    return this.tutorDetailForm.controls.firstName as FormControl;
  }

  get lastName(): FormControl {
    return this.tutorDetailForm.controls.lastName as FormControl;
  }

  get email(): FormControl {
    return this.tutorDetailForm.controls.email as FormControl;
  }

  get mobileNumber(): FormControl {
    return this.tutorDetailForm.controls.mobileNumber as FormControl;
  }

  get birthday(): FormControl {
    return this.tutorDetailForm.controls.birthday as FormControl;
  }

  get streetAddress(): FormControl {
    return this.tutorDetailForm.controls.streetAddress as FormControl;
  }

  get postalCode(): FormControl {
    return this.tutorDetailForm.controls.postalCode as FormControl;
  }

  get city(): FormControl {
    return this.tutorDetailForm.controls.city as FormControl;
  }

  get subjects(): FormControl {
    return this.tutorDetailForm.controls.subjects as FormControl;
  }

  get gradeLevels(): FormControl {
    return this.tutorDetailForm.controls.gradeLevels as FormControl;
  }

  get monday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('monday') as FormControl;
  }

  get tuesday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('tuesday') as FormControl;
  }

  get wednesday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('wednesday') as FormControl;
  }

  get thursday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('thursday') as FormControl;
  }

  get friday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('friday') as FormControl;
  }

  get saturday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('saturday') as FormControl;
  }

  get sunday(): FormControl {
    return this.tutorDetailForm.get('daysAvailable').get('sunday') as FormControl;
  }

  get price(): FormControl {
    return this.tutorDetailForm.controls.price as FormControl;
  }

  searchLocation = () => of([]);

  locationFormatterForm = (result: GeoLocation) => result.label || null;

}
