import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepperComponent} from './stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';

describe('StepperComponent', () => {
  /*let component: StepperComponent;*/
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkStepperModule],
      declarations: [StepperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    /*component = fixture.componentInstance;*/
    fixture.detectChanges();
  });

  // FIXME
  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
