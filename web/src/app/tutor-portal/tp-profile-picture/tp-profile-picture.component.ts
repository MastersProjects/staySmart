import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {Image} from '../../shared/model/image.model';
import {getProfilePicture} from 'src/app/shared/utils.functions';

@Component({
  selector: 'app-tp-profile-picture',
  templateUrl: './tp-profile-picture.component.html',
  styleUrls: ['./tp-profile-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TpProfilePictureComponent implements OnInit {

  @Input() profilePicture: Image;
  @Output() saveNewProfilePicture = new EventEmitter<string>();

  imageChangedEvent: Event;
  isCropperImageLoaded: boolean;
  private croppedImage: string;
  private isCropperReady: boolean;

  getProfilePicture = getProfilePicture;

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

  cropperReady() {
    this.isCropperReady = true;
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
