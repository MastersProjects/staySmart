import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpLoginComponent} from './tp-login.component';
import {TestingModule} from '../../../testing/testing.module';

describe('TpLoginComponent', () => {
  let component: TpLoginComponent;
  let fixture: ComponentFixture<TpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [TpLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
