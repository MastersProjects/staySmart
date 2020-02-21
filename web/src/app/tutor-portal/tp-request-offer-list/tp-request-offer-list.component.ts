import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-tp-request-offer-list',
  templateUrl: './tp-request-offer-list.component.html',
  styleUrls: ['./tp-request-offer-list.component.scss']
})
export class TpRequestOfferListComponent implements OnInit {

  tutorPortalSentOffers$: Observable<TutorSearchRequestOffer[]>;

  constructor(private tutorPortalService: TutorPortalService) {
  }

  ngOnInit(): void {
    this.tutorPortalSentOffers$ = this.tutorPortalService.getTutorPortalSentOffers();
  }

}
