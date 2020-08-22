import {Component, OnInit} from '@angular/core';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {Tutor} from '../../../shared/model/tutor.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ap-tutor-list',
  templateUrl: './ap-tutor-list.component.html',
  styleUrls: ['./ap-tutor-list.component.scss']
})
export class ApTutorListComponent implements OnInit {

  tutors$: Observable<Tutor[]>;

  constructor(private adminPortalService: AdminPortalService) {
  }

  ngOnInit(): void {
    this.tutors$ = this.adminPortalService.tutors$;
  }

}
