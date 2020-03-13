import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestData} from '../../shared/model/tutor-search-request.model';
import {Tutor} from '../../shared/model/tutor.model';
import {TutorAuthService} from '../../auth/tutor-auth.service';

@Component({
  selector: 'app-tp-request-list',
  templateUrl: './tp-request-list.component.html',
  styleUrls: ['./tp-request-list.component.scss']
})
export class TpRequestListComponent implements OnInit {

  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;
  tutorPortalUser$: Observable<Tutor | null>;

  constructor(private tutorPortalService: TutorPortalService, private authService: TutorAuthService) {
  }

  ngOnInit() {
    this.tutorSearchRequests$ = this.tutorPortalService.getTutorSearchRequests();
    this.tutorPortalUser$ = this.authService.tutorPortalUser$;
  }

  hasSent(sentOffers: string[], id: string) {
    if (sentOffers) {
      return sentOffers.includes(id);
    } else {
      return false;
    }
  }

}
