import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TpResetPasswordComponent} from './tp-reset-password.component';
import {TestingModule} from '../../../testing/testing.module';

describe('TpResetPasswordComponent', () => {
  let component: TpResetPasswordComponent;
  let fixture: ComponentFixture<TpResetPasswordComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [TpResetPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
