import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApResetPasswordComponent} from './ap-reset-password.component';
import {TestingModule} from '../../../testing/testing.module';

describe('ApResetPasswordComponent', () => {
  let component: ApResetPasswordComponent;
  let fixture: ComponentFixture<ApResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApResetPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
