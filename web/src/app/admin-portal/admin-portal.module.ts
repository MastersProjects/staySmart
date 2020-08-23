import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPortalRoutingModule} from './admin-portal-routing.module';
import {AdminPortalComponent} from './admin-portal.component';
import {ApLoginComponent} from './ap-authentication/ap-login/ap-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ApResetPasswordComponent} from './ap-authentication/ap-reset-password/ap-reset-password.component';
import {SharedModule} from '../shared/shared.module';
import {ApNavigationComponent} from './ap-navigation/ap-navigation.component';
import {NgbButtonsModule, NgbDropdownModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {ApTutorListComponent} from './ap-tutor/ap-tutor-list/ap-tutor-list.component';
import {AdminPortalService} from './shared/admin-portal.service';
import {ApTutorListCardComponent} from './ap-tutor/ap-tutor-list-card/ap-tutor-list-card.component';
import {ApTutorDetailComponent} from './ap-tutor/ap-tutor-detail/ap-tutor-detail.component';
import {ApTutorStatusComponent} from './ap-tutor/ap-tutor-status/ap-tutor-status.component';
import {ApRequestListComponent} from './ap-request/ap-request-list/ap-request-list.component';
import {ApRequestListCardComponent} from './ap-request/ap-request-list-card/ap-request-list-card.component';
import {ApRequestStatusComponent} from './ap-request/ap-request-status/ap-request-status.component';
import {ApRequestDetailComponent} from './ap-request/ap-request-detail/ap-request-detail.component';
import {ApRequestOfferDetailComponent} from './ap-request/ap-request-offer-detail/ap-request-offer-detail.component';


@NgModule({
  declarations: [
    AdminPortalComponent,
    ApLoginComponent,
    ApResetPasswordComponent,
    ApNavigationComponent,
    ApTutorListComponent,
    ApTutorListCardComponent,
    ApTutorDetailComponent,
    ApTutorStatusComponent,
    ApRequestListComponent,
    ApRequestListCardComponent,
    ApRequestStatusComponent,
    ApRequestDetailComponent,
    ApRequestOfferDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPortalRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbButtonsModule,
  ],
  providers: [AdminPortalService]
})
export class AdminPortalModule {
}
