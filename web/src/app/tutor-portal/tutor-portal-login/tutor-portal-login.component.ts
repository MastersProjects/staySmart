import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tutor} from '../../shared/model/tutor.model';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutor-portal-login',
  templateUrl: './tutor-portal-login.component.html',
  styleUrls: ['./tutor-portal-login.component.scss']
})
export class TutorPortalLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  tutor$: Observable<Tutor> | Observable<null>;

  ngOnInit() {
    this.tutor$ = this.authService.tutorPortalUser$.pipe();
  }

  login(email: string, password: string) {
    console.log('login');
    this.authService.login(email, password).subscribe(response => {
      console.log(response);
      this.router.navigate(['/tutor-portal']);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('logged out');
      this.router.navigate(['/tutor-portal/login']);
    });
  }

}
