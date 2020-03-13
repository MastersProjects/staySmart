import {Component, OnInit} from '@angular/core';
import {TutorAuthService} from '../auth/tutor-auth.service';
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

  constructor(private authService: TutorAuthService, private router: Router) {
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
