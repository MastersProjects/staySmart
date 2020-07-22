import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {BirthdayInputComponent} from './birthday-input/birthday-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StatusPipe} from './status.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    BirthdayInputComponent,
    StatusPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    BirthdayInputComponent,
    StatusPipe,
  ]
})
export class SharedModule {
}
