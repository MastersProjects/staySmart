import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApTutorListComponent} from './ap-tutor-list.component';
import {AdminPortalService} from '../shared/admin-portal.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';

describe('ApTutorListComponent', () => {
  let component: ApTutorListComponent;
  let fixture: ComponentFixture<ApTutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirePerformanceModule,
      ],
      declarations: [ApTutorListComponent],
      providers: [AdminPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
