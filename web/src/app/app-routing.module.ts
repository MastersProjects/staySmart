import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RequestComponent} from './search/request/request.component';

const routes: Routes = [
  {path: '', redirectTo: 'staysmart', pathMatch: 'full'},
  {path: 'staysmart', component: HomeComponent},
  {path: 'anfragen', component: RequestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
