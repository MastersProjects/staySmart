import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TpRequestOfferFormComponent} from './tp-request-offer-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule} from '@angular/forms';

describe('TpRequestOfferFormComponent', () => {
  let component: TpRequestOfferFormComponent;
  let fixture: ComponentFixture<TpRequestOfferFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule
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
