import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestDetailComponent} from './ap-request-detail.component';
import {TestingModule} from '../../../testing/testing.module';
import {AdminPortalService} from '../../shared/admin-portal.service';

describe('ApRequestDetailComponent', () => {
  let component: ApRequestDetailComponent;
  let fixture: ComponentFixture<ApRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApRequestDetailComponent],
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
