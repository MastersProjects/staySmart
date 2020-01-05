import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorPortalRoutingModule} from './tutor-portal-routing.module';
import {TutorPortalComponent} from './tutor-portal.component';
import {TutorPortalLoginComponent} from './tutor-portal-login/tutor-portal-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorPortalResetPasswordComponent} from './tutor-portal-reset-password/tutor-portal-reset-password.component';
import {TutorPortalDashboardComponent} from './tutor-portal-dashboard/tutor-portal-dashboard.component';
import {TutorPortalRequestListComponent} from './tutor-portal-request-list/tutor-portal-request-list.component';
import {TutorPortalService} from './shared/tutor-portal.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TutorPortalRequestDetailComponent} from './tutor-portal-request-detail/tutor-portal-request-detail.component';
import {TutorPortalRequestOfferComponent} from './tutor-portal-request-offer/tutor-portal-request-offer.component';


@NgModule({
  declarations: [
    TutorPortalComponent,
    TutorPortalLoginComponent,
    TutorPortalResetPasswordComponent,
    TutorPortalDashboardComponent,
    TutorPortalRequestListComponent,
    TutorPortalRequestDetailComponent,
    TutorPortalRequestOfferComponent
  ],
  imports: [
    CommonModule,
    TutorPortalRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [TutorPortalService] // Because TutorPortalService is only provided in this module which is lazy loaded
})
export class TutorPortalModule {
}
