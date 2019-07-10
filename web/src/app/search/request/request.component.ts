import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainLayoutComponent } from 'src/app/general/main-layout/main-layout.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor(private mainLayoutComponent: MainLayoutComponent) { }

  steps: HTMLCollectionOf<Element>;
  progressBars: HTMLCollectionOf<Element>;
  step: number;

  ngOnInit() {
    this.mainLayoutComponent.banner = { "image": "anfragen_unscharf.png", "html": "<h1 class='display-4'>Anfrage erstellen</h1>" };
    this.steps = document.getElementsByClassName('step');
    this.progressBars = document.getElementsByClassName('progress');
    this.step = 0;
  }

  prevStep() {
    if (this.step > 0) {
      this.progressBars[this.step - 1].classList.remove('complete');
      this.steps[this.step].className = "step";

      var formElementNow = document.getElementById('f' + (this.step + 1));
      var formElementNext = document.getElementById('f' + this.step);

      formElementNow.style.display = "none";
      formElementNext.style.display = "block";

      this.step -= 1;
      this.steps[this.step].className = "step active-step";
    }
  }

  nextStep() {
    if (this.step < this.steps.length - 1) {
      this.progressBars[this.step].classList.add('complete');
      this.step += 1;

      var formElementNow = document.getElementById('f' + this.step);
      var formElementNext = document.getElementById('f' + (this.step + 1));

      formElementNow.style.display = "none";
      formElementNext.style.display = "block";

      this.steps[this.step].className = "step active-step";
    }
  }
}
