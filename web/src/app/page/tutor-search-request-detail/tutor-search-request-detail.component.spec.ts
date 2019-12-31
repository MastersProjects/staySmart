import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorSearchRequestDetailComponent} from './tutor-search-request-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppModule} from '../../app.module';

describe('TutorSearchRequestDetailComponent', () => {
  let component: TutorSearchRequestDetailComponent;
  let fixture: ComponentFixture<TutorSearchRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ],
      declarations: [ TutorSearchRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSearchRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
