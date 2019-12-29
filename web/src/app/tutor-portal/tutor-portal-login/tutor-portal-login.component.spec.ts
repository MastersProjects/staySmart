import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalLoginComponent} from './tutor-portal-login.component';

describe('PortalLoginComponent', () => {
  let component: TutorPortalLoginComponent;
  let fixture: ComponentFixture<TutorPortalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPortalLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
