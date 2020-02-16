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
import {TutorPortalRequestOfferFormComponent} from './tutor-portal-request-offer-form/tutor-portal-request-offer-form.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {TutorPortalNavigationComponent} from './tutor-portal-navigation/tutor-portal-navigation.component';
import {TutorPortalProfileComponent} from './tutor-portal-profile/tutor-portal-profile.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {TutorPortalProfilePictureComponent} from './tutor-portal-profile-picture/tutor-portal-profile-picture.component';
import {TutorPortalRequestOfferListComponent} from './tutor-portal-request-offer-list/tutor-portal-request-offer-list.component';
import {TutorPortalRequestOfferDetailComponent} from './tutor-portal-request-offer-detail/tutor-portal-request-offer-detail.component';


@NgModule({
  declarations: [
    TutorPortalComponent,
    TutorPortalLoginComponent,
    TutorPortalResetPasswordComponent,
    TutorPortalDashboardComponent,
    TutorPortalRequestListComponent,
    TutorPortalRequestDetailComponent,
    TutorPortalRequestOfferFormComponent,
    TutorPortalNavigationComponent,
    TutorPortalProfileComponent,
    TutorPortalProfilePictureComponent,
    TutorPortalRequestOfferListComponent,
    TutorPortalRequestOfferDetailComponent
  ],
  imports: [
    CommonModule,
    TutorPortalRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    ImageCropperModule
  ],
  providers: [TutorPortalService] // Because TutorPortalService is only provided in this module which is lazy loaded
})
export class TutorPortalModule {
}
