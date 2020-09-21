import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApTutorListCardComponent} from './ap-tutor-list-card.component';

describe('ApTutorListCardComponent', () => {
  let component: ApTutorListCardComponent;
  let fixture: ComponentFixture<ApTutorListCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApTutorListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
