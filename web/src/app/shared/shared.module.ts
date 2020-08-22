import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {BirthdayInputComponent} from './birthday-input/birthday-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TutorStatusPipe} from './pipes/tutor-status.pipe';
import {TutorSearchRequestStatusPipe} from './pipes/tutor-search-request-status.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    BirthdayInputComponent,
    TutorStatusPipe,
    TutorSearchRequestStatusPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    BirthdayInputComponent,
    TutorStatusPipe,
    TutorSearchRequestStatusPipe,
  ]
})
export class SharedModule {
}
