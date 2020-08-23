import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferStatusComponent} from './offer-status.component';

describe('OfferStatusComponent', () => {
  let component: OfferStatusComponent;
  let fixture: ComponentFixture<OfferStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
