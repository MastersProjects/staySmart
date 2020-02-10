import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalProfilePictureComponent} from './tutor-portal-profile-picture.component';

describe('TutorPortalProfilePictureComponent', () => {
  let component: TutorPortalProfilePictureComponent;
  let fixture: ComponentFixture<TutorPortalProfilePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPortalProfilePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
