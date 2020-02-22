import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';
import {AuthService} from '../../auth/auth.service';
import {Tutor} from '../../shared/model/tutor.model';

@Component({
  selector: 'app-tp-dashboard',
  templateUrl: './tp-dashboard.component.html',
  styleUrls: ['./tp-dashboard.component.scss']
})
export class TpDashboardComponent implements OnInit {

  matchingTutorSearchRequests$: Observable<TutorSearchRequestData[]>;
  tutorPortalUser$: Observable<Tutor | null>;

  constructor(private tutorPortalService: TutorPortalService, private authService: AuthService) {
  }

  ngOnInit() {
    this.matchingTutorSearchRequests$ = this.tutorPortalService.getMatchingTutorSearchRequests();
    this.tutorPortalUser$ = this.authService.tutorPortalUser$;
  }

  onDecline(tutorSearchRequest: TutorSearchRequestData) {
    this.tutorPortalService.declineMatchingTutorSearchRequest(tutorSearchRequest.id).then(() => {
      console.log('declined', tutorSearchRequest);
    });
  }

  hasSent(sentOffers: string[], id: string) {
    if (sentOffers) {
      return sentOffers.includes(id);
    } else {
      return false;
    }
  }
}
