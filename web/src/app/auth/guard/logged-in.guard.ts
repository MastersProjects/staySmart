import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => !isLoggedIn),
      tap(notLoggedIn => {
        if (!notLoggedIn) {
          console.log('is already logged in');
          console.log('navigate to', route.data.navigate ? route.data.navigate : '/staysmart');
          this.router.navigate([route.data.navigate ? route.data.navigate : '/staysmart']);
        }
      })
    );
  }

}
