import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApTutorDetailComponent} from './ap-tutor-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AdminPortalService} from '../shared/admin-portal.service';

describe('ApTutorDetailComponent', () => {
  let component: ApTutorDetailComponent;
  let fixture: ComponentFixture<ApTutorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApTutorDetailComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
      ],
      providers: [AdminPortalService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
