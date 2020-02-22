import {Component, OnInit} from '@angular/core';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {filter, map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tp-request-offer-list',
  templateUrl: './tp-request-offer-list.component.html',
  styleUrls: ['./tp-request-offer-list.component.scss']
})
export class TpRequestOfferListComponent implements OnInit {

  tutorPortalSentOffers$: Observable<TutorSearchRequestOffer[]>;
  selectedRequestId$: Observable<string>;

  constructor(private tutorPortalService: TutorPortalService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tutorPortalSentOffers$ = this.tutorPortalService.getTutorPortalSentOffers();

    this.selectedRequestId$ = this.activatedRoute.queryParams.pipe(
      filter(params => params.selectedRequestId),
      map(params => params.selectedRequestId),
      shareReplay(1)
    );
  }

}
