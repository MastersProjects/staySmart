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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TutorSearchRequestComponent,
    BannerComponent,
    LocationDomainValidatorDirective
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
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
