import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalRequestOfferDetailComponent} from './tutor-portal-request-offer-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TutorPortalRequestOfferDetailComponent', () => {
  let component: TutorPortalRequestOfferDetailComponent;
  let fixture: ComponentFixture<TutorPortalRequestOfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [ TutorPortalRequestOfferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalRequestOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
