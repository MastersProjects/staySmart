import {Component, EventEmitter, Output} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper {

  @Output() stepperCompleted = new EventEmitter();

  completeStepper() {
    this.stepperCompleted.emit(true);
  }
}
