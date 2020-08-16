import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorAuthService} from '../../../auth/tutor-auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from 'firebase/app';
import {AngularFirePerformance} from '@angular/fire/performance';


@Component({
  selector: 'app-tp-login',
  templateUrl: './tp-login.component.html',
  styleUrls: ['./tp-login.component.scss']
})
export class TpLoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean;
  eventAuthError$: Observable<string>;
  emailVerifiedError: boolean;
  emailVerificationSent: boolean;
  version = environment.version;
  private user: User;

  constructor(private tutorAuthService: TutorAuthService, private router: Router,
              private angularFirePerformance: AngularFirePerformance) {
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
    this.eventAuthError$ = this.tutorAuthService.eventAuthError$;
  }

  ngOnDestroy() {
  }

  async login() {
    if (this.loginForm.valid) {
      console.log('tutor login');
      this.isLoading = true;
      const loginTrace = await this.angularFirePerformance.trace('TP: login');
      loginTrace.start();
      this.tutorAuthService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(userCredential => {
          loginTrace.putAttribute('emailVerified', `${userCredential.user.emailVerified}`);
          if (userCredential) {
            if (userCredential.user.emailVerified) {
              loginTrace.putAttribute('loginSuccessful', 'true');
              this.router.navigate(['/tutor-portal']);
            } else {
              this.user = userCredential.user;
              this.emailVerifiedError = true;
            }
          } else {
            loginTrace.putAttribute('loginSuccessful', 'false');
          }
        })
        .finally(() => {
          this.isLoading = false;
          loginTrace.stop();
        });
    }
  }

  sendEmailVerification() {
    this.user.sendEmailVerification().then(async () => {
      await this.tutorAuthService.logout();
      this.emailVerifiedError = false;
      this.emailVerificationSent = true;
    });
  }

  get userEmail() {
    return this.user.email;
  }

  private createLoginForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
}
