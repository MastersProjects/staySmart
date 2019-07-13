import {Component, OnInit} from '@angular/core';
import {Banner} from '../../../shared/model/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  banner: Banner = {image: 'background.jpg', html: '<h1>Stay Smart</h1>'};
  // home: Banner = {image: 'background.jpg', html: '<h1 class=\'display-4\'>Willkommen auf stay smart!</h1><p class=\'lead\'>Die simple Nachhilfvermittlung für alle Klassenstufen</p><hr class=\'my-4\'><p>Nachhilfelherer suchen?</p><p class=\'lead\'><a class=\'btn btn-primary btn-lg\' href=\'anfragen\' role=\'button\'>Anfrage erstllen</a></p>'};
  // request: Banner = { image: 'anfragen_unscharf.png', html: '<h1 class=\'display-4\'>Anfrage erstellen</h1>' };

  constructor() {
  }

  ngOnInit() {
  }

}
