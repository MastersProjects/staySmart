import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApTutorStatusComponent} from './ap-tutor-status.component';

describe('ApTutorStatusComponent', () => {
  let component: ApTutorStatusComponent;
  let fixture: ComponentFixture<ApTutorStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApTutorStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
