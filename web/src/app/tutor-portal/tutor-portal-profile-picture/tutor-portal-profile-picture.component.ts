import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dimensions, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-tutor-portal-profile-picture',
  templateUrl: './tutor-portal-profile-picture.component.html',
  styleUrls: ['./tutor-portal-profile-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorPortalProfilePictureComponent implements OnInit {

  @Input() profilePicture: {
    downloadUrl?: string,
    fullPath?: string,
  };
  @Output() saveNewProfilePicture = new EventEmitter<string>();

  imageChangedEvent: Event;
  isCropperImageLoaded: boolean;
  private croppedImage: string;
  private isCropperReady: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  fileChangeEvent($event: Event) {
    console.log('fileChange');
    this.imageChangedEvent = $event;
  }

  imageCropped($event: ImageCroppedEvent) {
    this.croppedImage = $event.base64;
  }

  cropperImageLoaded() {
    this.isCropperImageLoaded = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.isCropperReady = true;
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('load image failed');
    this.cancelProfilePicture();
  }

  get showProfilePicture() {
    return !this.isCropperImageLoaded && !this.imageChangedEvent;
  }

  get showPictureLoading() {
    return this.imageChangedEvent && !this.isCropperReady;
  }

  saveProfilePicture() {
    this.saveNewProfilePicture.emit(this.croppedImage);
    this.cancelProfilePicture();
  }

  cancelProfilePicture() {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.isCropperImageLoaded = false;
    this.isCropperReady = false;
  }

}
