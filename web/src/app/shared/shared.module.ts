import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {BirthdayInputComponent} from './birthday-input/birthday-input.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    BirthdayInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    BirthdayInputComponent
  ]
})
export class SharedModule { }
