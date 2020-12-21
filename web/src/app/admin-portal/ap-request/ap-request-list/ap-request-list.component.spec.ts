import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestListComponent} from './ap-request-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TestingModule} from '../../../testing/testing.module';
import {ApRequestListCardComponent} from '../ap-request-list-card/ap-request-list-card.component';
import {RequestStatusComponent} from '../../../shared/components/request-status/request-status.component';
import {AdminPortalService} from '../../shared/admin-portal.service';

describe('ApRequestListComponent', () => {
  let component: ApRequestListComponent;
  let fixture: ComponentFixture<ApRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule,
      ],
      declarations: [
        ApRequestListComponent,
        ApRequestListCardComponent,
        RequestStatusComponent,
      ],
      providers: [AdminPortalService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
