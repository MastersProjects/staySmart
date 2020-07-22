import {Pipe, PipeTransform} from '@angular/core';
import {TutorStatus} from './model/tutor.model';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: TutorStatus): string {

    if (value === TutorStatus.ACTIVATED) {
      return 'Aktiv';
    } else if (value === TutorStatus.DEACTIVATED) {
      return 'Deaktiviert';
    } else if (value === TutorStatus.NEW) {
      return 'Neu';
    }
    return 'unknown status';
  }

}
