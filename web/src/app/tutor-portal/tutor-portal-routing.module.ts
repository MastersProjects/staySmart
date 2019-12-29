import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutorPortalComponent} from './tutor-portal.component';
import {TutorPortalLoginComponent} from './tutor-portal-login/tutor-portal-login.component';
import {TutorPortalAuthGuard} from '../auth/guard/tutor-portal-auth.guard';


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
    component: TutorPortalLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorPortalRoutingModule {
}
