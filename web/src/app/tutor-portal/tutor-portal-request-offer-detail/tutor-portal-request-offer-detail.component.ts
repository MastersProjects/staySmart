import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {AnimationEvent} from '@angular/animations';
import {collapse} from '../../shared/collapse.animation';

@Component({
  selector: 'app-tutor-portal-request-offer-detail',
  templateUrl: './tutor-portal-request-offer-detail.component.html',
  styleUrls: ['./tutor-portal-request-offer-detail.component.scss'],
  animations: [collapse]
})
export class TutorPortalRequestOfferDetailComponent implements OnInit {

  @Input() tutorPortalOffer: TutorSearchRequestOffer;

  @ViewChild('card') private cardElement: ElementRef;

  isCollapsed = true;
  faChevronUp = faChevronUp;

  constructor() {
  }

  ngOnInit(): void {
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
