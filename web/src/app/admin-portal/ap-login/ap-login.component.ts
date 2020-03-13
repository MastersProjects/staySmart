import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import * as firebase from 'firebase/app';
import {User} from 'firebase/app';
import {AdminAuthService} from '../../auth/admin-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ap-login',
  templateUrl: './ap-login.component.html',
  styleUrls: ['./ap-login.component.scss']
})
export class ApLoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  eventAuthError$: Observable<string>;
  emailVerifiedError: boolean;
  emailVerificationSent: boolean;
  version = environment.version;
  private user: User;

  private performance = firebase.performance();

  constructor(private adminAuthService: AdminAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    this.eventAuthError$ = this.adminAuthService.eventAuthError$;
  }

  login() {
    if (this.loginForm.valid) {
      console.log('admin login');
      this.isLoading = true;
      const loginTrace = this.performance.trace('admin-login');
      loginTrace.start();
      this.adminAuthService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(userCredential => {
          loginTrace.putAttribute('emailVerified', `${userCredential.user.emailVerified}`);
          if (userCredential) {
            if (userCredential.user.emailVerified) {
              loginTrace.putAttribute('loginSuccessful', 'true');
              this.router.navigate(['/admin-portal']);
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
      await this.adminAuthService.logout();
      this.emailVerifiedError = false;
      this.emailVerificationSent = true;
    });
  }

  get userEmail() {
    return this.user.email;
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  private createLoginForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
}
