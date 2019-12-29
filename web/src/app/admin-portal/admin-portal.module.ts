import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPortalRoutingModule} from './admin-portal-routing.module';
import {AdminPortalComponent} from './admin-portal.component';


@NgModule({
  declarations: [AdminPortalComponent],
  imports: [
    CommonModule,
    AdminPortalRoutingModule,
  ]
})
export class AdminPortalModule { }
