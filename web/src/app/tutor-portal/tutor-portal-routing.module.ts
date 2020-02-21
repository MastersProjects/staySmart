import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutorPortalComponent} from './tutor-portal.component';
import {TpLoginComponent} from './tp-authentication/tp-login/tp-login.component';
import {TutorPortalAuthGuard} from '../auth/guard/tutor-portal-auth.guard';
import {LoggedInGuard} from '../auth/guard/logged-in.guard';
import {TpResetPasswordComponent} from './tp-authentication/tp-reset-password/tp-reset-password.component';
import {TpDashboardComponent} from './tp-dashboard/tp-dashboard.component';
import {TpRequestListComponent} from './tp-request-list/tp-request-list.component';
import {TpProfileComponent} from './tp-profile/tp-profile.component';
import {TpRequestOfferListComponent} from './tp-request-offer-list/tp-request-offer-list.component';


const routes: Routes = [
  {
    path: '',
    component: TutorPortalComponent,
    children: [
      {path: 'dashboard', component: TpDashboardComponent},
      {path: 'request-list', component: TpRequestListComponent},
      {path: 'offer-list', component: TpRequestOfferListComponent},
      {path: 'profile', component: TpProfileComponent},
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ],
    canActivate: [TutorPortalAuthGuard]
  },
  {
    path: 'login',
    component: TpLoginComponent,
    canActivate: [LoggedInGuard],
    data: {navigate: '/tutor-portal'}
  },
  {
    path: 'reset-password',
    component: TpResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorPortalRoutingModule {
}
