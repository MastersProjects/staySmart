import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {AnimationEvent} from '@angular/animations';
import {RotateProp} from '@fortawesome/fontawesome-svg-core';
import {collapse} from '../../../shared/collapse.animation';
import {TutorSearchRequestOffer} from '../../../shared/model/tutor-search-request.model';

@Component({
  selector: 'app-ap-request-offer-detail',
  templateUrl: './ap-request-offer-detail.component.html',
  styleUrls: ['./ap-request-offer-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapse],
})
export class ApRequestOfferDetailComponent {

  @Input() tutorSearchRequestOffer: TutorSearchRequestOffer;
  @Input() showRequestLink: boolean;

  @ViewChild('card') private cardElement: ElementRef;

  isCollapsed = true;
  faChevronUp = faChevronUp;

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

  get chevronRotation(): RotateProp {
    return this.isCollapsed ? '180' : '' as any;
  }

}
