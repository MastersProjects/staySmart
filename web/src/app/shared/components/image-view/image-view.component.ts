import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewComponent {
  @Input() imageSrc;
  @Input() title;

  constructor(private ngbActiveModal: NgbActiveModal) {
  }

  close(): void {
    this.ngbActiveModal.dismiss();
  }
}
