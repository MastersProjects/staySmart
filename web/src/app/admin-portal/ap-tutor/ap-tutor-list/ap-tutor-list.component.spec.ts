import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApTutorListComponent} from './ap-tutor-list.component';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {TestingModule} from '../../../testing/testing.module';

describe('ApTutorListComponent', () => {
  let component: ApTutorListComponent;
  let fixture: ComponentFixture<ApTutorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApTutorListComponent],
      providers: [AdminPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
