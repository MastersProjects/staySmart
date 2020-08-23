import {Pipe, PipeTransform} from '@angular/core';
import {TutorSearchRequestOfferStatus} from '../model/tutor-search-request.model';

@Pipe({
  name: 'offerStatus'
})
export class OfferStatusPipe implements PipeTransform {

  transform(value: TutorSearchRequestOfferStatus): string {

    if (value === TutorSearchRequestOfferStatus.NEW) {
      return 'Neu';
    } else if (value === TutorSearchRequestOfferStatus.ACCEPTED) {
      return 'Akzeptiert';
    } else if (value === TutorSearchRequestOfferStatus.DECLINED) {
      return 'Abgelehnt';
    }
    return 'unknown status';
  }

}
