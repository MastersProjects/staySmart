import {animate, state, style, transition, trigger} from '@angular/animations';

export const collapse = trigger('collapse', [
  state('closed', style({height: '0', overflow: 'hidden', opacity: '0'})),
  state('opened', style({overflow: 'hidden', opacity: '1'})),
  transition('closed=>opened', animate('500ms')),
  transition('opened=>closed', animate('500ms'))
]);
