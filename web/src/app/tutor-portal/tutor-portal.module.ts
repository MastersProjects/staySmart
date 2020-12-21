import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorPortalRoutingModule} from './tutor-portal-routing.module';
import {TutorPortalComponent} from './tutor-portal.component';
import {TpLoginComponent} from './tp-authentication/tp-login/tp-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TpResetPasswordComponent} from './tp-authentication/tp-reset-password/tp-reset-password.component';
import {TpDashboardComponent} from './tp-dashboard/tp-dashboard.component';
import {TpRequestListComponent} from './tp-request-list/tp-request-list.component';
import {TutorPortalService} from './shared/tutor-portal.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TpRequestDetailComponent} from './tp-request-detail/tp-request-detail.component';
import {TpRequestOfferFormComponent} from './tp-request-offer-form/tp-request-offer-form.component';
import {NgbButtonsModule, NgbDropdownModule, NgbNavModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {TpNavigationComponent} from './tp-navigation/tp-navigation.component';
import {TpProfileComponent} from './tp-profile/tp-profile.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {TpProfilePictureComponent} from './tp-profile-picture/tp-profile-picture.component';
import {TpRequestOfferListComponent} from './tp-request-offer-list/tp-request-offer-list.component';
import {TpRequestOfferDetailComponent} from './tp-request-offer-detail/tp-request-offer-detail.component';
import {SharedModule} from '../shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    TutorPortalComponent,
    TpLoginComponent,
    TpResetPasswordComponent,
    TpDashboardComponent,
    TpRequestListComponent,
    TpRequestDetailComponent,
    TpRequestOfferFormComponent,
    TpNavigationComponent,
    TpProfileComponent,
    TpProfilePictureComponent,
    TpRequestOfferListComponent,
    TpRequestOfferDetailComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        TutorPortalRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        NgbNavModule,
        NgbTypeaheadModule,
        NgbButtonsModule,
        ImageCropperModule,
        NgMultiSelectDropDownModule
    ],
  providers: [TutorPortalService] // Because TutorPortalService is only provided in this module which is lazy loaded
})
export class TutorPortalModule {
}
