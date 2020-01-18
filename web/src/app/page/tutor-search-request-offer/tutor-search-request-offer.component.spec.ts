import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestOfferComponent} from './tutor-search-request-offer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TutorSearchRequestOfferComponent', () => {
  let component: TutorSearchRequestOfferComponent;
  let fixture: ComponentFixture<TutorSearchRequestOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [TutorSearchRequestOfferComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSearchRequestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
