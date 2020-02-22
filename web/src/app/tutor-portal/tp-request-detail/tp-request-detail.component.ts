import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {AnimationEvent} from '@angular/animations';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {TutorPortalService} from '../shared/tutor-portal.service';
import {collapse} from '../../shared/collapse.animation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tp-request-detail',
  templateUrl: './tp-request-detail.component.html',
  styleUrls: ['./tp-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapse]
})
export class TpRequestDetailComponent implements OnInit {

  @Input() tutorSearchRequest: TutorSearchRequestData;
  @Input() isDeclinable: boolean;
  @Input() hasSent: boolean;

  @Output() declined = new EventEmitter<void>();

  @ViewChild('card') private cardElement: ElementRef;

  requestAccepted: boolean;
  faCheck = faCheck;
  faTimes = faTimes;
  faChevronUp = faChevronUp;
  isCollapsed = true;

  constructor(private tutorPortalService: TutorPortalService, private router: Router) {
  }

  ngOnInit() {
  }

  collapseToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  get collapseState() {
    return this.isCollapsed ? 'closed' : 'opened';
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

  declineRequest() {
    this.declined.emit();
  }

  offerCanceled() {
    this.requestAccepted = false;
    new Promise(resolve => setTimeout(resolve, 300)).then(() => this.scrollToCardElement());
  }

  sendOffer(tutorSearchRequestOffer: TutorSearchRequestOffer) {
    this.tutorPortalService.sendTutorSearchRequestOffer(tutorSearchRequestOffer, this.tutorSearchRequest).then(response => {
      console.log('offer sent', response[1]);
      this.router.navigate(
        ['/tutor-portal', 'offer-list'],
        {queryParams: {selectedRequestId: this.tutorSearchRequest.id}}
      );
    });
  }

  private scrollToCardElement() {
    this.cardElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

}
