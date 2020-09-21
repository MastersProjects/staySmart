import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApRequestOfferDetailComponent} from './ap-request-offer-detail.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ApRequestOfferDetailComponent', () => {
  let component: ApRequestOfferDetailComponent;
  let fixture: ComponentFixture<ApRequestOfferDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [ApRequestOfferDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
