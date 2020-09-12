import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminPortalComponent} from './admin-portal.component';
import {ApLoginComponent} from './ap-authentication/ap-login/ap-login.component';
import {AdminPortalAuthGuard} from '../auth/guard/admin-portal-auth.guard';
import {ApResetPasswordComponent} from './ap-authentication/ap-reset-password/ap-reset-password.component';
import {LoggedInGuard} from '../auth/guard/logged-in.guard';
import {ApTutorListComponent} from './ap-tutor/ap-tutor-list/ap-tutor-list.component';
import {ApTutorDetailComponent} from './ap-tutor/ap-tutor-detail/ap-tutor-detail.component';
import {ApRequestListComponent} from './ap-request/ap-request-list/ap-request-list.component';
import {ApRequestDetailComponent} from './ap-request/ap-request-detail/ap-request-detail.component';
import {ApRequestOfferListComponent} from './ap-request/ap-request-offer-list/ap-request-offer-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      {path: 'tutors', component: ApTutorListComponent},
      {path: 'tutor/:uid', component: ApTutorDetailComponent},
      {path: 'requests', component: ApRequestListComponent},
      {path: 'request/:tutorSearchRequestID', component: ApRequestDetailComponent},
      {path: 'offers', component: ApRequestOfferListComponent},
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
