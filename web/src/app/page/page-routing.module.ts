import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageComponent} from './page.component';
import {HomeComponent} from './home/home.component';
import {TutorSearchRequestComponent} from './tutor-search-request/tutor-search-request.component';
import {TutorRegistrationComponent} from './tutor-registration/tutor-registration.component';
import {OrganisationComponent} from './organisation/organisation.component';
import {TeamComponent} from './team/team.component';
import {PresseComponent} from './presse/presse.component';
import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail/tutor-search-request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {path: 'staysmart', component: HomeComponent},
      {path: 'anfragen', component: TutorSearchRequestComponent},
      {path: 'anfragen/:linkRef', component: TutorSearchRequestDetailComponent},
      {path: 'anbieten', component: TutorRegistrationComponent},
      {path: 'verein', component: OrganisationComponent},
      {path: 'team', component: TeamComponent},
      {path: 'presse', component: PresseComponent},
      {path: '', redirectTo: 'staysmart', pathMatch: 'full'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}