import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireFunctionsModule} from '@angular/fire/functions';


@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyB0mb8Nwo4HG7aV7sYOdKnOoYDONhbIKes',
      authDomain: 'localhost:9099',
      databaseURL: 'localhost:8080',
      projectId: 'staysmart-dev',
      storageBucket: 'localhost',
      messagingSenderId: '1026658607075',
      appId: '1:1026658607075:web:e2668fc32b302527'
    }),
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
  ]
})
export class TestingModule {
}
