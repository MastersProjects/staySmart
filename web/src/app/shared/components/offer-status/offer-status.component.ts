import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TutorSearchRequestOfferStatus} from '../../model/tutor-search-request.model';

@Component({
  selector: 'app-offer-status',
  templateUrl: './offer-status.component.html',
  styleUrls: ['./offer-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferStatusComponent {

  @Input() status: TutorSearchRequestOfferStatus;

  get statusClass() {
    return {
      'badge-primary': this.status === TutorSearchRequestOfferStatus.NEW,
      'badge-success': this.status === TutorSearchRequestOfferStatus.ACCEPTED,
      'badge-danger': this.status === TutorSearchRequestOfferStatus.DECLINED,
    };
  }
}
