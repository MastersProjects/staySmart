import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tutor-portal-login',
  templateUrl: './tutor-portal-login.component.html',
  styleUrls: ['./tutor-portal-login.component.scss']
})
export class TutorPortalLoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  eventAuthError$: Observable<string>;
  version = environment.version;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
    this.eventAuthError$ = this.authService.eventAuthError$;
  }

  login() {
    if (this.loginForm.valid) {
      console.log('login');
      this.isLoading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then(response => {
        console.log(response);
        this.isLoading = false;
        if (response) {
          this.router.navigate(['/tutor-portal']);
        }
      });
    }
  }

  private createLoginForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
}
