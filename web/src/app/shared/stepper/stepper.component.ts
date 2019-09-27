import {ChangeDetectorRef, Component} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {Directionality} from '@angular/cdk/bidi';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper {

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
  }

}
