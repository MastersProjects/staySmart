import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestOfferListComponent} from './ap-request-offer-list.component';

describe('ApRequestOfferListComponent', () => {
  let component: ApRequestOfferListComponent;
  let fixture: ComponentFixture<ApRequestOfferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApRequestOfferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
