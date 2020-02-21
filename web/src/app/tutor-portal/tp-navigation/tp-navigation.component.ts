import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tutor} from '../../shared/model/tutor.model';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tp-navigation',
  templateUrl: './tp-navigation.component.html',
  styleUrls: ['./tp-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TpNavigationComponent implements OnInit {

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
