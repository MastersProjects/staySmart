import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TutorStatus} from '../../../shared/model/tutor.model';

@Component({
  selector: 'app-ap-tutor-status',
  templateUrl: './ap-tutor-status.component.html',
  styleUrls: ['./ap-tutor-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApTutorStatusComponent implements OnInit {

  @Input() status: TutorStatus;

  get statusClass() {
    return {
      'badge-primary': this.status === TutorStatus.NEW,
      'badge-success': this.status === TutorStatus.ACTIVATED,
      'badge-danger': this.status === TutorStatus.DEACTIVATED,
    };
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
