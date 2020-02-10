import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalProfileComponent} from './tutor-portal-profile.component';

describe('TutorPortalProfileComponent', () => {
  let component: TutorPortalProfileComponent;
  let fixture: ComponentFixture<TutorPortalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPortalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
