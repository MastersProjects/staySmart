import {Pipe, PipeTransform} from '@angular/core';
import {TutorSearchRequestStatus} from '../model/tutor-search-request.model';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {

  transform(value: TutorSearchRequestStatus): string {

    if (value === TutorSearchRequestStatus.NEW) {
      return 'Neu';
    } else if (value === TutorSearchRequestStatus.MEDIATED) {
      return 'MEDIATED';
    }
    return 'unknown status';
  }

}
