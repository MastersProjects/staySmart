import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Tutor} from '../shared/model/tutor.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutor-portal',
  templateUrl: './tutor-portal.component.html',
  styleUrls: ['./tutor-portal.component.scss']
})
export class TutorPortalComponent implements OnInit {

  tutor$: Observable<Tutor> | Observable<null>;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.tutor$ = this.authService.tutorPortalUser$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('logged out');
      this.router.navigate(['/tutor-portal/login']);
    });
  }
}
