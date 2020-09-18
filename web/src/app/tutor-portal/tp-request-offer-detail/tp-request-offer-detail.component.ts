import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp';
import {AnimationEvent} from '@angular/animations';
import {collapse} from '../../shared/collapse.animation';
import {RotateProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tp-request-offer-detail',
  templateUrl: './tp-request-offer-detail.component.html',
  styleUrls: ['./tp-request-offer-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapse]
})
export class TpRequestOfferDetailComponent implements OnInit, AfterViewInit {

  @Input() tutorPortalOffer: TutorSearchRequestOffer;
  @Input() selectedRequestId: string;

  @ViewChild('card') private cardElement: ElementRef;

  isCollapsed = true;
  faChevronUp = faChevronUp;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.tutorPortalOffer &&
      this.selectedRequestId === this.tutorPortalOffer.tutorSearchRequest.tutorSearchRequestData.id) {
      this.isCollapsed = false;
    }
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

  get chevronRotation(): RotateProp {
    return this.isCollapsed ? '180' : '' as any;
  }

}
