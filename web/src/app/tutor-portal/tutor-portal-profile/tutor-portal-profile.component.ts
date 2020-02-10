import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Tutor} from '../../shared/model/tutor.model';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';

@Component({
  selector: 'app-tutor-portal-profile',
  templateUrl: './tutor-portal-profile.component.html',
  styleUrls: ['./tutor-portal-profile.component.scss']
})
export class TutorPortalProfileComponent implements OnInit {

  tutorPortalUser$: Observable<Tutor>;
  faUser = faUser;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.tutorPortalUser$ = this.authService.tutorPortalUser$;
  }

}
