import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalDashboardComponent} from './tutor-portal-dashboard.component';

describe('TutorPortalDashboardComponent', () => {
  let component: TutorPortalDashboardComponent;
  let fixture: ComponentFixture<TutorPortalDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPortalDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
