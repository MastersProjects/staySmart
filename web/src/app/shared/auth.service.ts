import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {TutorRegistration} from './model/tutor-registration.model';
import {concatMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
  }

  private registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  registerNewTutor(tutorRegistration: TutorRegistration, password: string): Observable<void> {
    return this.registerUser(tutorRegistration.email, password).pipe(
      concatMap(userCredential => {
        return from(this.angularFirestore.collection('Tutors').doc(userCredential.user.uid).set(
          {...tutorRegistration, uid: userCredential.user.uid}
        ));
      })
    );
  }
}
