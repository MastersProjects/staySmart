import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TutorPortalResetPasswordComponent} from './tutor-portal-reset-password.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('TutorPortalResetPasswordComponent', () => {
  let component: TutorPortalResetPasswordComponent;
  let fixture: ComponentFixture<TutorPortalResetPasswordComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [TutorPortalResetPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPortalResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
