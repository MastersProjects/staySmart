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

  constructor(private authService: AuthService, private router: Router) {
  }

  tutor$: Observable<Tutor> | Observable<null>;

  ngOnInit() {
    this.tutor$ = this.authService.tutorPortalUser$;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('logged out');
      this.router.navigate(['/tutor-portal/login']);
    });
  }
}
