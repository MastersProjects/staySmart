import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorPortalRoutingModule} from './tutor-portal-routing.module';
import {TutorPortalComponent} from './tutor-portal.component';
import {TutorPortalLoginComponent} from './tutor-portal-login/tutor-portal-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalResetPasswordComponent} from './tutor-portal-reset-password/tutor-portal-reset-password.component';


@NgModule({
  declarations: [
    TutorPortalComponent,
    TutorPortalLoginComponent,
    TutorPortalResetPasswordComponent
  ],
  imports: [
    CommonModule,
    TutorPortalRoutingModule,
    ReactiveFormsModule
  ]
})
export class TutorPortalModule {
}
