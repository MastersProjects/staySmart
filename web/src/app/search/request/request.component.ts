import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainLayoutComponent } from 'src/app/general/main-layout/main-layout.component';
import { RequestForm } from 'src/shared/model/requestForm';
import { Observable, of } from 'rxjs';
import { LocationService } from 'src/shared/clients/location.service';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor(private mainLayoutComponent: MainLayoutComponent, private locationService: LocationService) { }

  /* Variables for stepper */
  steps: HTMLCollectionOf<Element>;
  progressBars: HTMLCollectionOf<Element>;
  step: number = 0;
  
  /* Variables for form */
  submitted = false;
  model: RequestForm = new RequestForm();
  grades = ['1. - 3. Klasse', '4. - 6. Klasse', 'Sekundarstufe']; // ToDo load dynmaic not static
  subjects = ['Mathe', 'Physik', 'Deutsch', 'Englisch']; // ToDo load dynmaic not static

  /* Variables location search */
  searching = false;
  searchFailed = false;

  ngOnInit() {
    this.mainLayoutComponent.banner = { "image": "anfragen_unscharf.png", "html": "<h1 class='display-4'>Anfrage erstellen</h1>" };
    this.steps = document.getElementsByClassName('step');
    this.progressBars = document.getElementsByClassName('progress');
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
      if (this.formValid(this.step)) {
        this.progressBars[this.step].classList.add('complete');
        this.step += 1;
  
        var formElementNow = document.getElementById('f' + this.step);
        var formElementNext = document.getElementById('f' + (this.step + 1));
  
        formElementNow.style.display = "none";
        formElementNext.style.display = "block";
  
        this.steps[this.step].className = "step active-step";
      } else {
        console.log("Form invalid for next step!") // ToDo Error message 
      }
    }
  }
  
  formValid(step: number): boolean {
    var check = false;
    if (step == 0) 
      var check = this.model.firstname && this.model.name && this.model.mail && this.model.phone ? true: false;
    else if (step == 1)
      check = this.model.grade && this.model.subject ? true: false;
    else if (step == 2)
      check = this.model.budget && this.model.problem && this.model.location ? true: false; // ToDo add time validation
    
    return check;
  }

  onSubmit() { 
    if (this.formValid(0) && this.formValid(1) && this.formValid(2))
      console.log(JSON.stringify(this.model)); 
    else 
      console.log("Error in Form")
  }

  searchLocation = (text: Observable<string>) =>
    text.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.locationService.searchLocation(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            console.log("Search failed")
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    locationFormatter = (result: any) => result.attrs.label.replace(/<[^>]*>/g, '');
    locationFomratterForm = (result: any) => result.attrs.label = result.attrs.label.replace(/<[^>]*>/g, '');

}
