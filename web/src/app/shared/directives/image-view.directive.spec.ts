import {ImageViewDirective} from './image-view.directive';
import {TestBed} from '@angular/core/testing';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

describe('ImageViewDirective', () => {
  it('should create an instance', () => {
    const ngbModal = TestBed.inject(NgbModal);
    const directive = new ImageViewDirective(ngbModal);
    expect(directive).toBeTruthy();
  });
});
