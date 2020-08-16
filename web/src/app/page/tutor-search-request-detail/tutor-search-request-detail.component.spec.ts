import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail.component';
import {TutorSearchRequestOfferComponent} from '../tutor-search-request-offer/tutor-search-request-offer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TestingModule} from '../../testing/testing.module';

describe('TutorSearchRequestDetailComponent', () => {
  let component: TutorSearchRequestDetailComponent;
  let fixture: ComponentFixture<TutorSearchRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule,
      ],
      declarations: [
        TutorSearchRequestDetailComponent,
        TutorSearchRequestOfferComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSearchRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
