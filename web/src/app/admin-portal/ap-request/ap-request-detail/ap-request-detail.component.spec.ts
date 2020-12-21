import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestDetailComponent} from './ap-request-detail.component';
import {TestingModule} from '../../../testing/testing.module';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {of} from 'rxjs';

describe('ApRequestDetailComponent', () => {
  let component: ApRequestDetailComponent;
  let fixture: ComponentFixture<ApRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApRequestDetailComponent],
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadOffers', () => {
    it('should get tutorSearchRequestOffers', () => {
      const adminPortalService = TestBed.inject(AdminPortalService);
      spyOn(adminPortalService, 'getTutorSearchRequestOffers').and.returnValue(of({} as any));
      component.tutorSearchRequestOffers$ = undefined;

      component.loadOffers('tutorSearchRequestID');

      expect(adminPortalService.getTutorSearchRequestOffers).toHaveBeenCalledWith('tutorSearchRequestID');
      expect(component.tutorSearchRequestOffers$).toBeDefined();
    });
  });
});
