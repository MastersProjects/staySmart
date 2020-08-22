import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestListCardComponent} from './ap-request-list-card.component';

describe('ApRequestListCardComponent', () => {
  let component: ApRequestListCardComponent;
  let fixture: ComponentFixture<ApRequestListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApRequestListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
