import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TutorSearchRequestStatus} from '../../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-ap-request-status',
  templateUrl: './ap-request-status.component.html',
  styleUrls: ['./ap-request-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApRequestStatusComponent {

  @Input() status: TutorSearchRequestStatus;

  get statusClass() {
    return {
      'badge-primary': this.status === TutorSearchRequestStatus.NEW,
      'badge-success': this.status === TutorSearchRequestStatus.MEDIATED,
    };
  }
}
