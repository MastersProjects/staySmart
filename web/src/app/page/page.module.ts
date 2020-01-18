import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageRoutingModule} from './page-routing.module';
import {PageComponent} from './page.component';
import {HomeComponent} from './home/home.component';
import {TutorSearchRequestComponent} from './tutor-search-request/tutor-search-request.component';
import {BannerComponent} from './banner/banner.component';
import {TutorRegistrationComponent} from './tutor-registration/tutor-registration.component';
import {OrganisationComponent} from './organisation/organisation.component';
import {TeamComponent} from './team/team.component';
import {PresseComponent} from './presse/presse.component';
import {StepperComponent} from '../shared/stepper/stepper.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail/tutor-search-request-detail.component';
import {TutorSearchRequestOfferComponent} from './tutor-search-request-offer/tutor-search-request-offer.component';

@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    TutorSearchRequestComponent,
    BannerComponent,
    TutorRegistrationComponent,
    OrganisationComponent,
    TeamComponent,
    PresseComponent,
    StepperComponent,
    TutorSearchRequestDetailComponent,
    TutorSearchRequestOfferComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CdkStepperModule
  ]
})
export class PageModule {
}
