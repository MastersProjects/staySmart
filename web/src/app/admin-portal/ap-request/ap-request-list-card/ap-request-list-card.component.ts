import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TutorSearchRequestData} from '../../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-ap-request-list-card',
  templateUrl: './ap-request-list-card.component.html',
  styleUrls: ['./ap-request-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApRequestListCardComponent {

  @Input() tutorSearchRequestData: TutorSearchRequestData;

}
