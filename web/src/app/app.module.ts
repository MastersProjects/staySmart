import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TutorSearchRequestComponent} from './tutor-search-request/tutor-search-request.component';
import {HttpClientModule} from '@angular/common/http';
import {BannerComponent} from './general/banner/banner.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {TutorRegistrationComponent} from './tutor-registration/tutor-registration.component';
import {OrganisationComponent} from './other/organisation/organisation.component';
import {TeamComponent} from './other/team/team.component';
import {PresseComponent} from './other/presse/presse.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StepperComponent} from './shared/stepper/stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';

registerLocaleData(localeDECH);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TutorSearchRequestComponent,
    BannerComponent,
    TutorRegistrationComponent,
    OrganisationComponent,
    TeamComponent,
    PresseComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CdkStepperModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de-ch'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
