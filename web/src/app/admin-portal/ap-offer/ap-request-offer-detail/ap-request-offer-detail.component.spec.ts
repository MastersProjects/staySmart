import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApRequestOfferDetailComponent} from './ap-request-offer-detail.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ApRequestOfferDetailComponent', () => {
  let component: ApRequestOfferDetailComponent;
  let fixture: ComponentFixture<ApRequestOfferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [ApRequestOfferDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApRequestOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('collapseToggle', () => {
    it('should set true if false', () => {
      component.isCollapsed = false;
      component.collapseToggle();
      expect(component.isCollapsed).toBeTruthy();
    });

    it('should set false if true', () => {
      component.isCollapsed = true;
      component.collapseToggle();
      expect(component.isCollapsed).toBeFalsy();
    });
  });

  describe('collapseState', () => {
    it('should return `closed` if isCollapsed true', () => {
      component.isCollapsed = true;
      expect(component.collapseState).toBe('closed');
    });

    it('should return `opened` if isCollapsed false', () => {
      component.isCollapsed = false;
      expect(component.collapseState).toBe('opened');
    });
  });

  describe('onCollapseAnimationDone', () => {
    it('should scrollToCardElement on toState `opened`', () => {
      spyOn(component as any, 'scrollToCardElement');
      component.onCollapseAnimationDone({toState: 'opened'} as any);
      expect((component as any).scrollToCardElement).toHaveBeenCalled();
    });

    it('should not scrollToCardElement on toState `closed`', () => {
      spyOn(component as any, 'scrollToCardElement');
      component.onCollapseAnimationDone({toState: 'closed'} as any);
      expect((component as any).scrollToCardElement).not.toHaveBeenCalled();
    });
  });

  describe('scrollToCardElement', () => {
    it('should scrollIntoView', () => {
      spyOn((component as any).cardElement.nativeElement, 'scrollIntoView');
      (component as any).scrollToCardElement();
      expect((component as any).cardElement.nativeElement.scrollIntoView).toHaveBeenCalledWith(
        {behavior: 'smooth', block: 'start'}
      );
    });
  });

  describe('chevronRotation', () => {
    it('should return `180` if isCollapsed true', () => {
      component.isCollapsed = true;
      expect(component.chevronRotation).toBe(180);
    });

    it('should return `` if isCollapsed false', () => {
      component.isCollapsed = false;
      expect(component.chevronRotation).toBe('' as any);
    });
  });
});
