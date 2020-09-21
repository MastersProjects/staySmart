import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApConfigurationComponent} from './ap-configuration.component';
import {TestingModule} from '../../testing/testing.module';

describe('ApConfigurationComponent', () => {
  let component: ApConfigurationComponent;
  let fixture: ComponentFixture<ApConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApConfigurationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
