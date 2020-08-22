import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestDetailComponent} from './ap-request-detail.component';

describe('ApRequestDetailComponent', () => {
  let component: ApRequestDetailComponent;
  let fixture: ComponentFixture<ApRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
