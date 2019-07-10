import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../general/main-layout/main-layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private mainLayoutComponent: MainLayoutComponent ) { }

  ngOnInit() {
    this.mainLayoutComponent.banner = {"image": "background.jpg", "html": "<h1 class='display-4'>Willkommen auf stay smart!</h1><p class='lead'>Die simple Nachhilfvermittlung für alle Klassenstufen</p><hr class='my-4'><p>Nachhilfelherer suchen?</p><p class='lead'><a class='btn btn-primary btn-lg' href='anfragen' role='button'>Anfrage erstllen</a></p>"}
  }

}
