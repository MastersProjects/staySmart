import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminAuthService} from '../../../auth/admin-auth.service';

@Component({
  selector: 'app-ap-reset-password',
  templateUrl: './ap-reset-password.component.html',
  styleUrls: ['./ap-reset-password.component.scss']
})
export class ApResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  isLoading: boolean;
  submitted: boolean;

  constructor(private authService: AdminAuthService) {
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
