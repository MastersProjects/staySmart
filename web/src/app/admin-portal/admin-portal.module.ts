import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPortalRoutingModule} from './admin-portal-routing.module';
import {AdminPortalComponent} from './admin-portal.component';
import {ApLoginComponent} from './ap-login/ap-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ApResetPasswordComponent} from './ap-reset-password/ap-reset-password.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminPortalComponent,
    ApLoginComponent,
    ApResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AdminPortalRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class AdminPortalModule {
}
