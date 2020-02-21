import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-tp-reset-password',
  templateUrl: './tp-reset-password.component.html',
  styleUrls: ['./tp-reset-password.component.scss']
})
export class TpResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isLoading: boolean;
  submitted: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.createResetPasswordForm();
  }

  sendPasswordResetEmail() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetPasswordForm.value.email).then(response => {
        console.log(response);
        console.log('Password reset link sent to email', this.resetPasswordForm.value.email);
        this.isLoading = false;
        this.submitted = true;
      });
    }
  }

  private createResetPasswordForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
}
