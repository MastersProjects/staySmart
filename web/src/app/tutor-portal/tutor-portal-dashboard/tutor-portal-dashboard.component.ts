import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-tutor-portal-dashboard',
  templateUrl: './tutor-portal-dashboard.component.html',
  styleUrls: ['./tutor-portal-dashboard.component.scss']
})
export class TutorPortalDashboardComponent implements OnInit {

  matchingTutorSearchRequests$: Observable<TutorSearchRequestData[]>;

  constructor(private tutorPortalService: TutorPortalService) { }

  ngOnInit() {
    this.matchingTutorSearchRequests$ = this.tutorPortalService.getMatchingTutorSearchRequests();
  }

}
