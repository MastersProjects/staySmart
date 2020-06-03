import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorAuthService} from '../../auth/tutor-auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Tutor} from '../../shared/model/tutor.model';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {AngularFirePerformance} from '@angular/fire/performance';

@Component({
  selector: 'app-tp-profile',
  templateUrl: './tp-profile.component.html',
  styleUrls: ['./tp-profile.component.scss']
})
export class TpProfileComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  tutorPortalUser: Tutor;
  profileInfoForm: FormGroup;

  constructor(private authService: TutorAuthService, private tutorPortalService: TutorPortalService,
              private angularFirePerformance: AngularFirePerformance) {
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
