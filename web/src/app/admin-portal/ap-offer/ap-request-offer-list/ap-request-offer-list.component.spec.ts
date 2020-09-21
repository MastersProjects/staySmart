import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApRequestOfferListComponent} from './ap-request-offer-list.component';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {TestingModule} from '../../../testing/testing.module';

describe('ApRequestOfferListComponent', () => {
  let component: ApRequestOfferListComponent;
  let fixture: ComponentFixture<ApRequestOfferListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApRequestOfferListComponent],
      providers: [AdminPortalService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
