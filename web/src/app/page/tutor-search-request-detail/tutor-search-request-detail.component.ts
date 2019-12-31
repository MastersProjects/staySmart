import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {TutorSearchRequest} from '../../shared/model/tutor-search-request.model';
import {switchMap} from 'rxjs/operators';
import {StaySmartService} from '../../shared/stay-smart.service';

@Component({
  selector: 'app-tutor-search-request-detail',
  templateUrl: './tutor-search-request-detail.component.html',
  styleUrls: ['./tutor-search-request-detail.component.scss']
})
export class TutorSearchRequestDetailComponent implements OnInit {

  tutorSearchRequest$: Observable<TutorSearchRequest | null>;

  constructor(private activatedRoute: ActivatedRoute, private staySmartService: StaySmartService) {
  }

  ngOnInit() {
    this.tutorSearchRequest$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.staySmartService.getTutorSearchRequest(params.get('linkRef'));
      })
    );
  }

}
