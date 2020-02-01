import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalNavigationComponent} from './tutor-portal-navigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('TutorPortalNavigationComponent', () => {
  let component: TutorPortalNavigationComponent;
  let fixture: ComponentFixture<TutorPortalNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TutorPortalNavigationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
