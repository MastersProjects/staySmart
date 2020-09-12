import {Component, OnInit} from '@angular/core';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {Observable} from 'rxjs';
import {TutorSearchRequestOffer} from '../../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-ap-request-offer-list',
  templateUrl: './ap-request-offer-list.component.html',
  styleUrls: ['./ap-request-offer-list.component.scss']
})
export class ApRequestOfferListComponent implements OnInit {

  tutorSearchRequestOffers$: Observable<TutorSearchRequestOffer[]>;

  constructor(private adminPortalService: AdminPortalService) { }

  ngOnInit(): void {
    this.tutorSearchRequestOffers$ = this.adminPortalService.getAllTutorSearchRequestOffers();
  }

}
