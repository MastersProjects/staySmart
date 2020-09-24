import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TpRequestOfferFormComponent} from './tp-request-offer-form.component';
import {TestingModule} from '../../testing/testing.module';

describe('TpRequestOfferFormComponent', () => {
  let component: TpRequestOfferFormComponent;
  let fixture: ComponentFixture<TpRequestOfferFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [TpRequestOfferFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel()', () => {
    it('should emit canceled event', () => {
      spyOn(component.canceled, 'emit');

      component.cancel();

      expect(component.canceled.emit).toHaveBeenCalled();
    });
  });

  describe('submitOffer()', () => {
    it('should emit submitted requestOfferForm event on valid', () => {
      spyOn(component.submitted, 'emit');
      component.minPrice = 5;
      component.ngOnInit();
      component.requestOfferForm.setValue({
        message: 'some message',
        price: '8'
      });
      component.submitOffer();

      expect(component.submitted.emit).toHaveBeenCalledWith({
        message: 'some message',
        price: '8'
      });
    });

    it('should no emit submitted requestOfferForm event on invalid', () => {
      spyOn(component.submitted, 'emit');
      component.minPrice = 5;
      component.ngOnInit();
      component.requestOfferForm.setValue({
        message: '',
        price: '4'
      });
      component.submitOffer();

      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
  });
});
