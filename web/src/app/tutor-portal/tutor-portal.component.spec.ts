import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalComponent} from './tutor-portal.component';
import {TpNavigationComponent} from './tp-navigation/tp-navigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TestingModule} from '../testing/testing.module';

describe('TutorPortalComponent', () => {
  let component: TutorPortalComponent;
  let fixture: ComponentFixture<TutorPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        FontAwesomeModule
      ],
      declarations: [
        TutorPortalComponent,
        TpNavigationComponent
      ]
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
