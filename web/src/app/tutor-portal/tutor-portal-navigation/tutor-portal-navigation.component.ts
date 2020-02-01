import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tutor} from '../../shared/model/tutor.model';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tutor-portal-navigation',
  templateUrl: './tutor-portal-navigation.component.html',
  styleUrls: ['./tutor-portal-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorPortalNavigationComponent implements OnInit {

  @Input() tutor: Tutor;
  @Output() logout = new EventEmitter<void>();

  faSignOutAlt = faSignOutAlt;
  version = environment.version;

  constructor() {
  }

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit();
  }

}
