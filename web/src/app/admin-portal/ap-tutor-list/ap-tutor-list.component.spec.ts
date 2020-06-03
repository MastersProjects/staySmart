import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApTutorListComponent} from './ap-tutor-list.component';

describe('ApTutorListComponent', () => {
  let component: ApTutorListComponent;
  let fixture: ComponentFixture<ApTutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApTutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
