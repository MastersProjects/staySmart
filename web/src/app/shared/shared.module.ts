import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {BirthdayInputComponent} from './components/birthday-input/birthday-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorStatusPipe} from './pipes/tutor-status.pipe';
import {TutorSearchRequestStatusPipe} from './pipes/tutor-search-request-status.pipe';
import {OfferStatusComponent} from './components/offer-status/offer-status.component';
import {OfferStatusPipe} from './pipes/offer-status.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    BirthdayInputComponent,
    OfferStatusComponent,
    TutorStatusPipe,
    TutorSearchRequestStatusPipe,
    OfferStatusPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    BirthdayInputComponent,
    OfferStatusComponent,
    TutorStatusPipe,
    TutorSearchRequestStatusPipe,
    OfferStatusPipe,
  ]
})
export class SharedModule {
}
