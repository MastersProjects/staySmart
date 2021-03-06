import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)
  },
  {
    path: 'tutor-portal',
    loadChildren: () => import('./tutor-portal/tutor-portal.module').then(m => m.TutorPortalModule)
  },
  {
    path: 'admin-portal',
    loadChildren: () => import('./admin-portal/admin-portal.module').then(m => m.AdminPortalModule)
  },
  {
    path: 'tutor',
    redirectTo: 'tutor-portal'
  },
  {
    path: 'admin',
    redirectTo: 'admin-portal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
