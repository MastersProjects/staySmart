import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {TutorPortalService} from '../shared/tutor-portal.service';

@Component({
  selector: 'app-tutor-portal-request-detail',
  templateUrl: './tutor-portal-request-detail.component.html',
  styleUrls: ['./tutor-portal-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapse', [
      state('closed', style({height: '0', overflow: 'hidden', opacity: '0'})),
      state('opened', style({overflow: 'hidden', opacity: '1'})),
      transition('closed=>opened', animate('500ms')),
      transition('opened=>closed', animate('500ms'))
    ])
  ]
})
export class TutorPortalRequestDetailComponent implements OnInit {

  @Input() tutorSearchRequest: TutorSearchRequestData;
  @ViewChild('card', {static: false}) private cardElement: ElementRef;

  requestAccepted: boolean;
  faCheck = faCheck;
  faTimes = faTimes;
  faChevronUp = faChevronUp;
  isCollapsed = true;

  constructor(private tutorPortalService: TutorPortalService) {
  }

  ngOnInit() {
  }

  collapseToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  onCollapseAnimationDone(animationEvent: AnimationEvent) {
    if (animationEvent.toState === 'opened') {
      this.scrollToCardElement();
    } else if (animationEvent.toState === 'closed' || this.requestAccepted) {
      this.requestAccepted = false;
    }
  }

  acceptRequest() {
    this.requestAccepted = true;
    new Promise(resolve => setTimeout(resolve, 300)).then(() => this.scrollToCardElement());
  }

  offerCanceled() {
    this.requestAccepted = false;
    new Promise(resolve => setTimeout(resolve, 300)).then(() => this.scrollToCardElement());
  }

  sendOffer(tutorSearchRequestOffer: TutorSearchRequestOffer) {
    this.tutorPortalService.sendTutorSearchRequestOffer(tutorSearchRequestOffer, this.tutorSearchRequest.id).then(response => {
      console.log('offer sent', response);
      // TODO action after offerSent
    });
  }

  private scrollToCardElement() {
    this.cardElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
