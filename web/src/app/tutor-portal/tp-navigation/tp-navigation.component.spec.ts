import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TpNavigationComponent} from './tp-navigation.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('TpNavigationComponent', () => {
  let component: TpNavigationComponent;
  let fixture: ComponentFixture<TpNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TpNavigationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
