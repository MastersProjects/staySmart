import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-ap-request-detail',
  templateUrl: './ap-request-detail.component.html',
  styleUrls: ['./ap-request-detail.component.scss']
})
export class ApRequestDetailComponent implements OnInit {

  private destroy$ = new Subject<void>();

  tutorSearchRequest$: Observable<TutorSearchRequestData>;
  tutorSearchRequestOffers$: Observable<TutorSearchRequestOffer[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private adminPortalService: AdminPortalService) {
  }

  ngOnInit(): void {
    this.loadTutorSearchRequest();
  }

  private loadTutorSearchRequest() {
    this.tutorSearchRequest$ = this.activatedRoute.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap((params: ParamMap) => this.adminPortalService.getTutorSearchRequest(params.get('tutorSearchRequestID'))),
    );
  }

  loadOffers(tutorSearchRequestID: string) {
    this.tutorSearchRequestOffers$ = this.adminPortalService.getTutorSearchRequestOffers(tutorSearchRequestID);
  }
}
