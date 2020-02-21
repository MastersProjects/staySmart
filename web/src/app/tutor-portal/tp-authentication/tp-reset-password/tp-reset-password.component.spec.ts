import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TpResetPasswordComponent} from './tp-reset-password.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('TpResetPasswordComponent', () => {
  let component: TpResetPasswordComponent;
  let fixture: ComponentFixture<TpResetPasswordComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [TpResetPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
