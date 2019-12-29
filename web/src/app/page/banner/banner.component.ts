import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {

  destroy$ = new Subject<void>();

  currentRoute$: Observable<string>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.currentRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url)
    );
  }

}
