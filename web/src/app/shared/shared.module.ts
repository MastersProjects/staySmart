import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {BirthdayInputComponent} from './components/birthday-input/birthday-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorStatusPipe} from './pipes/tutor-status.pipe';
import {RequestStatusPipe} from './pipes/request-status.pipe';
import {OfferStatusComponent} from './components/offer-status/offer-status.component';
import {OfferStatusPipe} from './pipes/offer-status.pipe';
import {RequestStatusComponent} from './components/request-status/request-status.component';


@NgModule({
  declarations: [
    FooterComponent,
    BirthdayInputComponent,
    OfferStatusComponent,
    RequestStatusComponent,
    TutorStatusPipe,
    RequestStatusPipe,
    OfferStatusPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    BirthdayInputComponent,
    RequestStatusComponent,
    OfferStatusComponent,
    TutorStatusPipe,
    RequestStatusPipe,
    OfferStatusPipe,
  ]
})
export class SharedModule {
}
