import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorPortalComponent} from './tutor-portal.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TutorPortalNavigationComponent} from './tutor-portal-navigation/tutor-portal-navigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('TutorPortalComponent', () => {
  let component: TutorPortalComponent;
  let fixture: ComponentFixture<TutorPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule,
        FontAwesomeModule
      ],
      declarations: [
        TutorPortalComponent,
        TutorPortalNavigationComponent
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
