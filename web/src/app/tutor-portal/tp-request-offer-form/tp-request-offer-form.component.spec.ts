import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TpRequestOfferFormComponent} from './tp-request-offer-form.component';
import {TestingModule} from '../../testing/testing.module';

describe('TpRequestOfferFormComponent', () => {
  let component: TpRequestOfferFormComponent;
  let fixture: ComponentFixture<TpRequestOfferFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ TpRequestOfferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpRequestOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
