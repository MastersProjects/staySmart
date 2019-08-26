import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  LocationDomainValidatorDirective,
  TutorSearchRequestComponent
} from './tutor-search-request/tutor-search-request.component';
import {HttpClientModule} from '@angular/common/http';
import {BannerComponent} from './general/banner/banner.component';
import {LocationService} from './shared/location.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {StaySmartService} from './shared/stay-smart.service';
import { TutorRegistrationComponent } from './tutor-registration/tutor-registration.component';
import { OrganisationComponent } from './other/organisation/organisation.component';
import { TeamComponent } from './other/team/team.component';
import { PresseComponent } from './other/presse/presse.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TutorSearchRequestComponent,
    BannerComponent,
    LocationDomainValidatorDirective,
    TutorRegistrationComponent,
    OrganisationComponent,
    TeamComponent,
    PresseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LocationService, StaySmartService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
