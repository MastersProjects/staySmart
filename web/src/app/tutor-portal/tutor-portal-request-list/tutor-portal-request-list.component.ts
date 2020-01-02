import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-tutor-portal-request-list',
  templateUrl: './tutor-portal-request-list.component.html',
  styleUrls: ['./tutor-portal-request-list.component.scss']
})
export class TutorPortalRequestListComponent implements OnInit {

  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;

  constructor(private tutorPortalService: TutorPortalService) { }

  ngOnInit() {
    this.tutorSearchRequests$ = this.tutorPortalService.getTutorSearchRequests();
  }

}
