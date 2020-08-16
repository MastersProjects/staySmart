import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpRequestListComponent} from './tp-request-list.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TpRequestDetailComponent} from '../tp-request-detail/tp-request-detail.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {TestingModule} from '../../testing/testing.module';

describe('TpRequestListComponent', () => {
  let component: TpRequestListComponent;
  let fixture: ComponentFixture<TpRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule,
      ],
      declarations: [
        TpRequestListComponent,
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
