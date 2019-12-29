import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalComponent} from './tutor-portal.component';

describe('PortalComponent', () => {
  let component: TutorPortalComponent;
  let fixture: ComponentFixture<TutorPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
