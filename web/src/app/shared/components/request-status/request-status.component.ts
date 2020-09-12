import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TutorSearchRequestStatus} from '../../model/tutor-search-request.model';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStatusComponent {

  @Input() status: TutorSearchRequestStatus;

  get statusClass() {
    return {
      'badge-primary': this.status === TutorSearchRequestStatus.NEW,
      'badge-success': this.status === TutorSearchRequestStatus.MEDIATED,
    };
  }
}
