import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminPortalComponent} from './admin-portal.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      /*{path: 'child', component: PortalChildComponent},
      {path: '', pathMatch: 'full', redirectTo: 'child'}*/
    ]/*,
    canActivate: [AdminPortalAuthGuard]*/
  }/*,
  {
    path: 'login',
    component: AdminPortalLoginComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule {
}
