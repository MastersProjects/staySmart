import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApLoginComponent} from './ap-login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {ReactiveFormsModule} from '@angular/forms';

describe('ApLoginComponent', () => {
  let component: ApLoginComponent;
  let fixture: ComponentFixture<ApLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule,
        AngularFirePerformanceModule,
        ReactiveFormsModule
      ],
      declarations: [ApLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
