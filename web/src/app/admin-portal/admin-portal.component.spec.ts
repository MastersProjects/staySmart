import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminPortalComponent} from './admin-portal.component';
import {TestingModule} from '../testing/testing.module';

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [AdminPortalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
