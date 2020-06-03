import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/model/image.model';
import {Tutor} from '../../shared/model/tutor.model';

@Component({
  selector: 'app-ap-tutor-list-card',
  templateUrl: './ap-tutor-list-card.component.html',
  styleUrls: ['./ap-tutor-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApTutorListCardComponent implements OnInit {

  @Input() tutor: Tutor;

  constructor() {
  }

  ngOnInit(): void {
  }

  getProfilePicture(profilePicture: Image): string {
    return (profilePicture && profilePicture.downloadUrl) ? profilePicture.downloadUrl : 'assets/img/logo.png';
  }

}
