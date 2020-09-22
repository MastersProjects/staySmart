import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuthMock} from './angular-fire-auth-mock';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformance, AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFirestoreMock} from './angular-firestore-mock';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireFunctions, AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireFunctionsMock} from './angular-fires-functions-mock';
import {AngularFirePerformanceMock} from './angular-fire-performance-mock';


@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    FontAwesomeModule,
    AngularFireModule,
  ],
  providers: [
    {provide: AngularFireAuth, useClass: AngularFireAuthMock},
    {provide: AngularFirestore, useClass: AngularFirestoreMock},
    {provide: AngularFireFunctions, useClass: AngularFireFunctionsMock},
    {provide: AngularFirePerformance, useClass: AngularFirePerformanceMock}
  ]
})
export class TestingModule {
}
