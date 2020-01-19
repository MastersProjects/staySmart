import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Tutor} from '../shared/model/tutor.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tutor-portal',
  templateUrl: './tutor-portal.component.html',
  styleUrls: ['./tutor-portal.component.scss']
})
export class TutorPortalComponent implements OnInit {

  version = environment.version;

  tutor$: Observable<Tutor> | Observable<null>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.tutor$ = this.authService.tutorPortalUser$;
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('logged out');
      this.router.navigate(['/tutor-portal/login']);
    });
  }
}