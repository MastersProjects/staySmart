import {FormGroup} from '@angular/forms';

export function repeatPasswordValidator(group: FormGroup) {
  const password = group.get('password').value;
  const repeatPassword = group.get('repeatPassword').value;
  return password === repeatPassword ? null : {notSame: true};
}
