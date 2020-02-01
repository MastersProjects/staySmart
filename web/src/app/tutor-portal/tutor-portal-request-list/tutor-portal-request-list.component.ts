import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';
import {Tutor} from '../../shared/model/tutor.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-tutor-portal-request-list',
  templateUrl: './tutor-portal-request-list.component.html',
  styleUrls: ['./tutor-portal-request-list.component.scss']
})
export class TutorPortalRequestListComponent implements OnInit {

  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;
  tutorPortalUser$: Observable<Tutor | null>;

  constructor(private tutorPortalService: TutorPortalService, private authService: AuthService) {
  }

  ngOnInit() {
    this.tutorSearchRequests$ = this.tutorPortalService.getTutorSearchRequests();
    this.tutorPortalUser$ = this.authService.tutorPortalUser$;
  }

  hasSent(sentOffers: string[], id: string) {
    return sentOffers.includes(id);
  }

}
