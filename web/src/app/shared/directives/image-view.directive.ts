import {Directive, HostListener, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageViewComponent} from '../components/image-view/image-view.component';

@Directive({
  selector: '[appImageView]'
})
export class ImageViewDirective {
  @Input() imageViewSrc: string;
  @Input() imageViewTitle: string;

  @HostListener('click') onMouseEnter() {
    const modalRef = this.ngbModal.open(ImageViewComponent, {size: 'xl', centered: true});
    modalRef.componentInstance.imageSrc = this.imageViewSrc;
    modalRef.componentInstance.title = this.imageViewTitle;
  }

  constructor(private ngbModal: NgbModal) {
  }
}

