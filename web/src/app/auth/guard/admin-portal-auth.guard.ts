import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AdminAuthService} from '../admin-auth.service';
import {AngularFirePerformance} from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})
export class AdminPortalAuthGuard implements CanActivate {

  constructor(private adminAuthService: AdminAuthService, private angularFirePerformance: AngularFirePerformance,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.log('AdminPortalAuthGuard');
    return this.adminAuthService.adminPortalUser$.pipe(
      take(1),
      map(admin => !!admin),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('not logged in');
          this.router.navigate(['admin-portal/login']);
        }
      }),
      this.angularFirePerformance.trace('AdminPortalAuthGuard')
    );
  }

}
