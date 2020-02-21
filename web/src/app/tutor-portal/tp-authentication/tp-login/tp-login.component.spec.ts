import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpLoginComponent} from './tp-login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('TpLoginComponent', () => {
  let component: TpLoginComponent;
  let fixture: ComponentFixture<TpLoginComponent>;

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
      declarations: [TpLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
