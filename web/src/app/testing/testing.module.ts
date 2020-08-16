import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuthMock} from './angular-fire-auth-mock';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFirestoreMock} from './angular-firestore-mock';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const MODULES = [
  CommonModule,
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFirePerformanceModule,
  AngularFireStorageModule,
  ReactiveFormsModule,
  RouterTestingModule,
  HttpClientTestingModule,
  FontAwesomeModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    ...MODULES,
    AngularFireModule,
  ],
  providers: [
    {provide: AngularFireAuth, useClass: AngularFireAuthMock},
    {provide: AngularFirestore, useClass: AngularFirestoreMock}
  ]
})
export class TestingModule {
}
