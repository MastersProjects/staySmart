import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpProfileComponent} from './tp-profile.component';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {TpProfilePictureComponent} from '../tp-profile-picture/tp-profile-picture.component';
import {LocationService} from '../../shared/location.service';
import {TestingModule} from '../../testing/testing.module';
import {SharedModule} from '../../shared/shared.module';

describe('TpProfileComponent', () => {
  let component: TpProfileComponent;
  let fixture: ComponentFixture<TpProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        SharedModule,
      ],
      declarations: [
        TpProfileComponent,
        TpProfilePictureComponent,
      ],
      providers: [
        TutorPortalService,
        LocationService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
