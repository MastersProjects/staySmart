import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RequestStatusComponent} from './request-status.component';

describe('RequestStatusComponent', () => {
  let component: RequestStatusComponent;
  let fixture: ComponentFixture<RequestStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RequestStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
