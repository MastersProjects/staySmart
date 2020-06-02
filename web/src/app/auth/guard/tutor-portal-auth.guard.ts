import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TutorAuthService} from '../tutor-auth.service';
import {map, take, tap} from 'rxjs/operators';
import {trace} from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})
export class TutorPortalAuthGuard implements CanActivate {


  constructor(private authService: TutorAuthService, private router: Router) {
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
      }),
      trace('TutorPortalAuthGuard')
    );
  }

}
