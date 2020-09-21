import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferStatusComponent} from './offer-status.component';

describe('OfferStatusComponent', () => {
  let component: OfferStatusComponent;
  let fixture: ComponentFixture<OfferStatusComponent>;

  beforeEach(waitForAsync(() => {
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
