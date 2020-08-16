import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApTutorDetailComponent} from './ap-tutor-detail.component';
import {AdminPortalService} from '../shared/admin-portal.service';
import {TestingModule} from '../../testing/testing.module';

describe('ApTutorDetailComponent', () => {
  let component: ApTutorDetailComponent;
  let fixture: ComponentFixture<ApTutorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApTutorDetailComponent],
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
