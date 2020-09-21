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
      declarations: [TpProfilePictureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideComponent(TpProfilePictureComponent, {set: {host: {'(click)': 'dummy'}}}) // Workaround for detectChange in onPush Component
      .createComponent(TpProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fileChangeEvent()', () => {
    it('should set imageChangedEvent', () => {
      component.imageChangedEvent = undefined;
      expect(component.imageChangedEvent).toBeFalsy();

      component.fileChangeEvent({someEvent: 'someEvent'} as any);

      expect(component.imageChangedEvent).toEqual({someEvent: 'someEvent'} as any);
    });
  });

  describe('imageCropped()', () => {
    it('should set imageCropped', () => {
      (component as any).croppedImage = undefined;
      expect((component as any).croppedImage).toBeFalsy();

      component.imageCropped({base64: 'base64'} as any);

      expect((component as any).croppedImage).toBe('base64');
    });
  });

  describe('cropperImageLoaded()', () => {
    it('should set cropperImageLoaded true', () => {
      component.isCropperImageLoaded = false;
      expect(component.isCropperImageLoaded).toBeFalsy();

      component.cropperImageLoaded();

      expect(component.isCropperImageLoaded).toBeTruthy();
    });

    it('should set right styles in template', () => {
      component.isCropperImageLoaded = false;
      expect(component.isCropperImageLoaded).toBeFalsy();
      expect(fixture.nativeElement.querySelector('image-cropper').parentElement.style.display).toBe('none');

      component.cropperImageLoaded();
      detectChange();

      expect(component.isCropperImageLoaded).toBeTruthy();
      expect(fixture.nativeElement.querySelector('image-cropper').parentElement.style.display).toBe('inline-block');
    });
  });

  describe('cropperReady()', () => {
    it('should set isCropperReady true', () => {
      (component as any).isCropperReady = undefined;
      expect((component as any).isCropperReady).toBeFalsy();

      component.cropperReady();

      expect((component as any).isCropperReady).toBeTruthy();
    });
  });

  describe('loadImageFailed()', () => {
    it('should set call cancelProfilePicture', () => {
      spyOn(component, 'cancelProfilePicture');

      component.loadImageFailed();

      expect(component.cancelProfilePicture).toHaveBeenCalled();
    });
  });

  describe('saveProfilePicture()', () => {
    it('should emit croppedImage and cancelProfilePicture', () => {
      spyOn(component.saveNewProfilePicture, 'emit');
      spyOn(component, 'cancelProfilePicture');

      (component as any).croppedImage = 'croppedImage';

      component.saveProfilePicture();

      expect(component.saveNewProfilePicture.emit).toHaveBeenCalledWith('croppedImage');
      expect(component.cancelProfilePicture).toHaveBeenCalled();
    });
  });

  describe('cancelProfilePicture()', () => {
    it('should emit croppedImage and cancelProfilePicture', () => {
      component.imageChangedEvent = {event: 'event'} as any;
      (component as any).croppedImage = 'croppedImage';
      component.isCropperImageLoaded = true;
      (component as any).isCropperReady = true;

      component.cancelProfilePicture();

      expect(component.imageChangedEvent).toBe(null);
      expect((component as any).croppedImage).toBe(null);
      expect(component.isCropperImageLoaded).toBe(false);
      expect((component as any).isCropperReady).toBe(false);
    });
  });

  describe('getter showProfilePicture()', () => {
    it('should return true on isCropperImageLoaded falsy and imageChangedEvent falsy', () => {
      component.isCropperImageLoaded = false;
      component.imageChangedEvent = undefined;

      expect(component.showProfilePicture).toBeTruthy();
    });

    it('should return false on isCropperImageLoaded truthy and imageChangedEvent falsy', () => {
      component.isCropperImageLoaded = true;
      component.imageChangedEvent = undefined;

      expect(component.showProfilePicture).toBeFalsy();
    });

    it('should return false on isCropperImageLoaded falsy and imageChangedEvent truthy', () => {
      component.isCropperImageLoaded = false;
      component.imageChangedEvent = {something: 'something'} as any;

      expect(component.showProfilePicture).toBeFalsy();
    });

    it('should return false on isCropperImageLoaded truthy and imageChangedEvent truthy', () => {
      component.isCropperImageLoaded = true;
      component.imageChangedEvent = {something: 'something'} as any;

      expect(component.showProfilePicture).toBeFalsy();
    });
  });

  describe('getter showPictureLoading()', () => {
    it('should return true on imageChangedEvent truthy and isCropperReady falsy', () => {
      component.imageChangedEvent = {something: 'something'} as any;
      (component as any).isCropperReady = false;

      expect(component.showPictureLoading).toBeTruthy();
    });

    it('should return false on imageChangedEvent falsy and isCropperReady falsy', () => {
      component.imageChangedEvent = undefined;
      (component as any).isCropperReady = false;

      expect(component.showPictureLoading).toBeFalsy();
    });

    it('should return false on imageChangedEvent falsy and isCropperReady truthy', () => {
      component.imageChangedEvent = undefined;
      (component as any).isCropperReady = true;

      expect(component.showPictureLoading).toBeFalsy();
    });

    it('should return false on imageChangedEvent truthy and isCropperReady truthy', () => {
      component.imageChangedEvent = {something: 'something'} as any;
      (component as any).isCropperReady = true;

      expect(component.showPictureLoading).toBeFalsy();
    });
  });

  // Workaround for detectChange in onPush Component
  const detectChange = () => {
    fixture.debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
  };
});
