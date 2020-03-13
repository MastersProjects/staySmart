import {Component, OnInit} from '@angular/core';
import {AdminAuthService} from '../auth/admin-auth.service';
import {Observable} from 'rxjs';
import {Admin} from '../shared/model/admin.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent implements OnInit {

  adminPortalUser$: Observable<Admin>;

  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  ngOnInit() {
    this.adminPortalUser$ = this.adminAuthService.adminPortalUser$;
  }

  async logout() {
    await this.adminAuthService.logout();
    await this.router.navigate(['/tutor-portal/login']);
  }
}
