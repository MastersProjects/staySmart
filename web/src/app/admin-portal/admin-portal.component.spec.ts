import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPortalComponent} from './admin-portal.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('AdminPortalComponent', () => {
  let component: AdminPortalComponent;
  let fixture: ComponentFixture<AdminPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
        RouterTestingModule
      ],
      declarations: [AdminPortalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
