import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {from, Observable, of} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {trace} from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      take(1),
      switchMap(authState => {
        if (authState) {
          if (authState.emailVerified) {
            return of(true);
          } else {
            console.log('E-Mail not verified');
            return from(this.angularFireAuth.signOut()).pipe(map(() => false));
          }
        } else {
          return of(false);
        }
      }),
      map(isLoggedIn => !isLoggedIn),
      tap(notLoggedIn => {
        if (!notLoggedIn) {
          console.log('is already logged in');
          console.log('navigate to', route.data.navigate ? route.data.navigate : '/staysmart');
          this.router.navigate([route.data.navigate ? route.data.navigate : '/staysmart']);
        }
      }),
      trace('LoggedInGuard')
    );
  }

}
