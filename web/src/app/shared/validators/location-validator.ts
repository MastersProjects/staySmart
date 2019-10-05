import { AbstractControl } from '@angular/forms';

export function locationDomainValidator(control: AbstractControl) {
    const location = control.value;
    if (!(location && location.label && location.detail && location.lon && location.lat && location.x
      && location.y && location.geomStBox2d)) {
        return { invalidLocation: { valid: false, value: control.value } };
    }
    return null;
  }
