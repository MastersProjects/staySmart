import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TutorSearchRequest, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {switchMap, tap} from 'rxjs/operators';
import {StaySmartService} from '../../shared/stay-smart.service';

@Component({
  selector: 'app-tutor-search-request-detail',
  templateUrl: './tutor-search-request-detail.component.html',
  styleUrls: ['./tutor-search-request-detail.component.scss']
})
export class TutorSearchRequestDetailComponent implements OnInit {

  tutorSearchRequest$: Observable<TutorSearchRequest | null>;

  constructor(private activatedRoute: ActivatedRoute, private staySmartService: StaySmartService,
              private router: Router) {
  }

  ngOnInit() {
    this.tutorSearchRequest$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.staySmartService.getTutorSearchRequest(params.get('linkRef'))),
      tap(result => {
        if (!result) {
          console.log('invalid refLink');
          this.router.navigate(['anfragen']);
        }
      })
    );
  }

  acceptOffer(tutorSearchRequestOffer: TutorSearchRequestOffer, tutorSearchRequest: TutorSearchRequest) {
    this.staySmartService.acceptTutorSearchRequestOffer(tutorSearchRequestOffer, tutorSearchRequest).then(() => {
      console.log('accepted offer', tutorSearchRequestOffer);
    });
  }

  declineOffer(tutorSearchRequestOffer: TutorSearchRequestOffer, tutorSearchRequestDataId: string) {
    this.staySmartService.declineTutorSearchRequestOffer(tutorSearchRequestOffer, tutorSearchRequestDataId).then(() => {
      console.log('declined offer', tutorSearchRequestOffer);
    });
  }
}
