import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from 'firebase';

@Component({
  selector: 'app-tutor-portal-login',
  templateUrl: './tutor-portal-login.component.html',
  styleUrls: ['./tutor-portal-login.component.scss']
})
export class TutorPortalLoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean;
  eventAuthError$: Observable<string>;
  emailVerifiedError: boolean;
  emailVerificationSent: boolean;
  version = environment.version;
  private user: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
    this.eventAuthError$ = this.authService.eventAuthError$;
  }

  ngOnDestroy() {
    if (this.user) {
      this.authService.logout();
    }
  }

  login() {
    if (this.loginForm.valid) {
      console.log('login');
      this.isLoading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(userCredential => {
          if (userCredential) {
            if (userCredential.user.emailVerified) {
              this.router.navigate(['/tutor-portal']);
            } else {
              this.user = userCredential.user;
              this.emailVerifiedError = true;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  sendEmailVerification() {
    this.user.sendEmailVerification().then(async () => {
      await this.authService.logout();
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
