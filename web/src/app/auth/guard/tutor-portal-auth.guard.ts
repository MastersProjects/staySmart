import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorPortalAuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.log('TutorPortalAuthGuard');
    return this.authService.tutorPortalUser$.pipe(
      take(1),
      map(tutor => !!tutor),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('not logged in');
          this.router.navigate(['tutor-portal/login']);
        }
      })
    );
  }

}
