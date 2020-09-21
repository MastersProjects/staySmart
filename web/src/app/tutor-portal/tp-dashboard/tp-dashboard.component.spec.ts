import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TpDashboardComponent} from './tp-dashboard.component';
import {TpRequestListComponent} from '../tp-request-list/tp-request-list.component';
import {TpRequestDetailComponent} from '../tp-request-detail/tp-request-detail.component';
import {TpRequestOfferFormComponent} from '../tp-request-offer-form/tp-request-offer-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TestingModule} from '../../testing/testing.module';

describe('TpDashboardComponent', () => {
  let component: TpDashboardComponent;
  let fixture: ComponentFixture<TpDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule,
      ],
      declarations: [
        TpDashboardComponent,
        TpRequestListComponent,
        TpRequestDetailComponent,
        TpRequestOfferFormComponent
      ],
      providers: [TutorPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
