import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TpRequestOfferDetailComponent} from './tp-request-offer-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

describe('TpRequestOfferDetailComponent', () => {
  let component: TpRequestOfferDetailComponent;
  let fixture: ComponentFixture<TpRequestOfferDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgbNavModule
      ],
      declarations: [TpRequestOfferDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
