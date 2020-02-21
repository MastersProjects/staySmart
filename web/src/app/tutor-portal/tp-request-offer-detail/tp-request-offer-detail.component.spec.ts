import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestOfferDetailComponent} from './tp-request-offer-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TpRequestOfferDetailComponent', () => {
  let component: TpRequestOfferDetailComponent;
  let fixture: ComponentFixture<TpRequestOfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [ TpRequestOfferDetailComponent ]
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
