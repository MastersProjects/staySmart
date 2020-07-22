import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminPortalComponent} from './admin-portal.component';
import {ApLoginComponent} from './ap-login/ap-login.component';
import {AdminPortalAuthGuard} from '../auth/guard/admin-portal-auth.guard';
import {ApResetPasswordComponent} from './ap-reset-password/ap-reset-password.component';
import {LoggedInGuard} from '../auth/guard/logged-in.guard';
import {ApTutorListComponent} from './ap-tutor-list/ap-tutor-list.component';
import {ApTutorDetailComponent} from './ap-tutor-detail/ap-tutor-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      {path: 'tutors', component: ApTutorListComponent},
      {path: 'tutor/:uid', component: ApTutorDetailComponent},
      /*{path: '', pathMatch: 'full', redirectTo: 'child'}*/
    ],
    canActivate: [AdminPortalAuthGuard]
  },
  {
    path: 'login',
    component: ApLoginComponent,
    canActivate: [LoggedInGuard],
    data: {navigate: '/admin-portal'}
  },
  {
    path: 'reset-password',
    component: ApResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule {
}
