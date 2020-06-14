import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Tutor} from '../../shared/model/tutor.model';
import {getProfilePicture} from 'src/app/shared/utils.functions';

@Component({
  selector: 'app-ap-tutor-list-card',
  templateUrl: './ap-tutor-list-card.component.html',
  styleUrls: ['./ap-tutor-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApTutorListCardComponent implements OnInit {

  @Input() tutor: Tutor;

  getProfilePicture = getProfilePicture;

  constructor() {
  }

  ngOnInit(): void {
  }

}
