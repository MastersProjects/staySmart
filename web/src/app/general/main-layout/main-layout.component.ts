import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/shared/model/banner';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  version = environment.version;
  banner: Banner;

  constructor() { }

  ngOnInit() {
    this.banner = {"image": "background.jpg", "html": "<h1>Stay Smart</h1>"}
  }
}
