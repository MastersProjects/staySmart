import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';

@Component({
  selector: 'app-tutor-portal-request-detail',
  templateUrl: './tutor-portal-request-detail.component.html',
  styleUrls: ['./tutor-portal-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('opened', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('closed=>opened', animate('500ms')),
      transition('opened=>closed', animate('500ms'))
    ])
  ]
})
export class TutorPortalRequestDetailComponent implements OnInit {

  @Input() tutorSearchRequest: TutorSearchRequestData;

  faCheck = faCheck;
  faTimes = faTimes;
  faChevronUp = faChevronUp;
  isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
  }

  collapseToggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
