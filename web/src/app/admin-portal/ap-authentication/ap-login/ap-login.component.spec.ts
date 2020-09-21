import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApLoginComponent} from './ap-login.component';
import {TestingModule} from '../../../testing/testing.module';

describe('ApLoginComponent', () => {
  let component: ApLoginComponent;
  let fixture: ComponentFixture<ApLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule
      ],
      declarations: [ApLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
