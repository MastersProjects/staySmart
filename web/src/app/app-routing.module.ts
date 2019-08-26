import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TutorSearchRequestComponent} from './tutor-search-request/tutor-search-request.component';
import {TutorRegistrationComponent} from './tutor-registration/tutor-registration.component';
import {OrganisationComponent} from './other/organisation/organisation.component';
import {TeamComponent} from './other/team/team.component';
import {PresseComponent} from './other/presse/presse.component';

const routes: Routes = [
  {path: '', redirectTo: 'staysmart', pathMatch: 'full'},
  {path: 'staysmart', component: HomeComponent},
  {path: 'anfragen', component: TutorSearchRequestComponent},
  {path: 'anbieten', component: TutorRegistrationComponent},
  {path: 'verein', component: OrganisationComponent},
  {path: 'team', component: TeamComponent},
  {path: 'presse', component: PresseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
