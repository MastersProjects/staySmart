import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutorPortalComponent} from './tutor-portal.component';
import {TutorPortalLoginComponent} from './tutor-portal-login/tutor-portal-login.component';
import {TutorPortalAuthGuard} from '../auth/guard/tutor-portal-auth.guard';
import {LoggedInGuard} from '../auth/guard/logged-in.guard';
import {TutorPortalResetPasswordComponent} from './tutor-portal-reset-password/tutor-portal-reset-password.component';
import {TutorPortalDashboardComponent} from './tutor-portal-dashboard/tutor-portal-dashboard.component';
import {TutorPortalRequestListComponent} from './tutor-portal-request-list/tutor-portal-request-list.component';
import {TutorPortalProfileComponent} from './tutor-portal-profile/tutor-portal-profile.component';


const routes: Routes = [
  {
    path: '',
    component: TutorPortalComponent,
    children: [
      {path: 'dashboard', component: TutorPortalDashboardComponent},
      {path: 'request-list', component: TutorPortalRequestListComponent},
      {path: 'profile', component: TutorPortalProfileComponent},
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ],
    canActivate: [TutorPortalAuthGuard]
  },
  {
    path: 'login',
    component: TutorPortalLoginComponent,
    canActivate: [LoggedInGuard],
    data: {navigate: '/tutor-portal'}
  },
  {
    path: 'reset-password',
    component: TutorPortalResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorPortalRoutingModule {
}
