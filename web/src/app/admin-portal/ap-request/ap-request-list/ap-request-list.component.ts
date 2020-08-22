import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../../shared/model/tutor-search-request.model';
import {AdminPortalService} from '../../shared/admin-portal.service';

@Component({
  selector: 'app-ap-request-list',
  templateUrl: './ap-request-list.component.html',
  styleUrls: ['./ap-request-list.component.scss']
})
export class ApRequestListComponent implements OnInit {

  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;

  constructor(private adminPortalService: AdminPortalService) {
  }

  ngOnInit() {
    this.tutorSearchRequests$ = this.adminPortalService.tutorSearchRequests$;
  }

}
