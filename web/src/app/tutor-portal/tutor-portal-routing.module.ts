import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutorPortalComponent} from './tutor-portal.component';
import {TutorPortalLoginComponent} from './tutor-portal-login/tutor-portal-login.component';
import {TutorPortalAuthGuard} from '../auth/guard/tutor-portal-auth.guard';
import {LoggedInGuard} from '../auth/guard/logged-in.guard';
import {TutorPortalResetPasswordComponent} from './tutor-portal-reset-password/tutor-portal-reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: TutorPortalComponent,
    children: [
      /*{path: 'child', component: PortalChildComponent},
      {path: '', pathMatch: 'full', redirectTo: 'child'}*/
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
