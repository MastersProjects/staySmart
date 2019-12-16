import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
  }


}
