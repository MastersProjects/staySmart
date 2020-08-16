import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestOfferListComponent} from './tp-request-offer-list.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TestingModule} from '../../testing/testing.module';

describe('TpRequestOfferListComponent', () => {
  let component: TpRequestOfferListComponent;
  let fixture: ComponentFixture<TpRequestOfferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [TpRequestOfferListComponent],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
