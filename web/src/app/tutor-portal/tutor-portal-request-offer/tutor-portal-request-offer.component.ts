import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tutor-portal-request-offer',
  templateUrl: './tutor-portal-request-offer.component.html',
  styleUrls: ['./tutor-portal-request-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorPortalRequestOfferComponent implements OnInit {

  @Input() minPrice: number;
  @Output() canceled = new EventEmitter<null>();

  requestOfferForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.requestOfferForm = this.createRequestOfferForm(this.minPrice);
  }

  private createRequestOfferForm(minPrice: number): FormGroup {
    return new FormGroup({
      message: new FormControl('', Validators.required),
      price: new FormControl(
        minPrice,
        [Validators.required, Validators.pattern('^[0-9]*$')]
      )
    });
  }

  cancel() {
    this.canceled.emit();
  }

  submitOffer() {
    if (this.requestOfferForm.valid) {
      console.log(this.requestOfferForm.value);
    }
  }
}
