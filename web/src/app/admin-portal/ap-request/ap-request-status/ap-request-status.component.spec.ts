import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestStatusComponent} from './ap-request-status.component';

describe('ApRequestStatusComponent', () => {
  let component: ApRequestStatusComponent;
  let fixture: ComponentFixture<ApRequestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApRequestStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
