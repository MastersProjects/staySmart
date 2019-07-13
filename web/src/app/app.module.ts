import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RequestComponent} from './search/request/request.component';
import {HttpClientModule} from '@angular/common/http';
import {BannerComponent} from './general/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
