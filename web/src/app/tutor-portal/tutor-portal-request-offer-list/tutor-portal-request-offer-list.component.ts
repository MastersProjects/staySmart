import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-tutor-portal-request-offer-list',
  templateUrl: './tutor-portal-request-offer-list.component.html',
  styleUrls: ['./tutor-portal-request-offer-list.component.scss']
})
export class TutorPortalRequestOfferListComponent implements OnInit {

  tutorPortalSentOffers$: Observable<TutorSearchRequestOffer[]>;

  constructor(private tutorPortalService: TutorPortalService) {
  }

  ngOnInit(): void {
    this.tutorPortalSentOffers$ = this.tutorPortalService.getTutorPortalSentOffers();
  }

}
