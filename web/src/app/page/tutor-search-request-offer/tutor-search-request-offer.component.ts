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
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {collapse} from '../../shared/collapse.animation';
import {AnimationEvent} from '@angular/animations';

@Component({
  selector: 'app-tutor-search-request-offer',
  templateUrl: './tutor-search-request-offer.component.html',
  styleUrls: ['./tutor-search-request-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapse]
})
export class TutorSearchRequestOfferComponent implements OnInit {

  @Input() tutorSearchRequestOffer: TutorSearchRequestOffer;
  @Output() accepted = new EventEmitter<void>();
  @Output() declined = new EventEmitter<void>();
  @ViewChild('card', {static: false}) private cardElement: ElementRef;

  faCheck = faCheck;
  faTimes = faTimes;
  faChevronUp = faChevronUp;

  isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
    if (this.tutorSearchRequestOffer && this.tutorSearchRequestOffer.status === 'accepted') {
      this.isCollapsed = false;
    }
  }

  acceptOffer() {
    this.accepted.emit();
  }

  declineOffer() {
    this.declined.emit();
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
    }
  }

  private scrollToCardElement() {
    this.cardElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
