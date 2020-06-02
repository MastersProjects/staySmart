import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Admin} from '../../shared/model/admin.model';
import {environment} from '../../../environments/environment';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';

@Component({
  selector: 'app-ap-navigation',
  templateUrl: './ap-navigation.component.html',
  styleUrls: ['./ap-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApNavigationComponent {

  @Input() admin: Admin;
  @Output() logout = new EventEmitter<void>();

  faSignOutAlt = faSignOutAlt;
  version = environment.version;

  onLogout() {
    this.logout.emit();
  }

}
