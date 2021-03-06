import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageComponent} from './page.component';
import {TutorSearchRequestComponent} from './tutor-search-request/tutor-search-request.component';
import {TutorRegistrationComponent} from './tutor-registration/tutor-registration.component';
import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail/tutor-search-request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {path: 'anfragen', component: TutorSearchRequestComponent},
      {path: 'anfragen/:linkRef', component: TutorSearchRequestDetailComponent},
      {path: 'anbieten', component: TutorRegistrationComponent},
      {path: '', redirectTo: 'anfragen', pathMatch: 'full'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
