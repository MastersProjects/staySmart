import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TpProfilePictureComponent} from './tp-profile-picture.component';
import {ImageCropperModule} from 'ngx-image-cropper';

describe('TutorPortalProfilePictureComponent', () => {
  let component: TpProfilePictureComponent;
  let fixture: ComponentFixture<TpProfilePictureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ImageCropperModule
      ],
      declarations: [ TpProfilePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
