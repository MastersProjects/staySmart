import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPortalRoutingModule} from './admin-portal-routing.module';
import {AdminPortalComponent} from './admin-portal.component';
import {ApLoginComponent} from './ap-login/ap-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ApResetPasswordComponent} from './ap-reset-password/ap-reset-password.component';
import {SharedModule} from '../shared/shared.module';
import {ApNavigationComponent} from './ap-navigation/ap-navigation.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AdminPortalComponent,
    ApLoginComponent,
    ApResetPasswordComponent,
    ApNavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPortalRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDropdownModule,
  ]
})
export class AdminPortalModule {
}
