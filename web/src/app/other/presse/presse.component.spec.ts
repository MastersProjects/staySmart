import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresseComponent } from './presse.component';

describe('TeamComponent', () => {
  let component: PresseComponent;
  let fixture: ComponentFixture<PresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
