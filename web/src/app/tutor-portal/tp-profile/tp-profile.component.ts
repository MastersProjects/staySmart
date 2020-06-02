import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorAuthService} from '../../auth/tutor-auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Tutor} from '../../shared/model/tutor.model';
import {TutorPortalService} from '../shared/tutor-portal.service';

@Component({
  selector: 'app-tp-profile',
  templateUrl: './tp-profile.component.html',
  styleUrls: ['./tp-profile.component.scss']
})
export class TpProfileComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  tutorPortalUser: Tutor;
  profileInfoForm: FormGroup;

  constructor(private authService: TutorAuthService, private tutorPortalService: TutorPortalService) {
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

  saveProfileInfo() {
    if (this.profileInfoForm.valid) {
      console.log('save', this.profileInfoForm.value);
    }
  }

  saveProfilePicture($event: string) {
    /*
    FIXME #43 not working https://github.com/angular/angularfire/blob/master/docs/performance/getting-started.md#manual-traces
    const trace = this.angularFirePerformance.trace('uploadProfilePicture');
    trace.start();*/
    this.tutorPortalService.uploadProfilePicture($event, this.tutorPortalUser)
      .then(() => {
        console.log('uploaded');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        /*trace.stop();*/
      });
  }

  createProfileInfoForm(): FormGroup {
    // TODO ProfileInfo
    return new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl('')
    });
  }
}
