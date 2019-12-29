import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import * as firebase from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Tutor} from '../shared/model/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    return from(this.angularFireAuth.auth.signOut());
  }

  get tutorPortalUser$(): Observable<Tutor | null> {
    return this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.getTutor(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  private getTutor(uid: string): Observable<Tutor | null> {
    return this.angularFirestore.collection('Tutors').doc(uid).valueChanges().pipe(
      switchMap(tutor => {
        if (tutor) {
          return of(tutor);
        } else {
          console.log(`Tutor ${uid} doesn't exist in Firestore`);
          return this.logout().pipe(map(() => null)); // mapping because we need Observable<null> instead of Observable<void>
        }
      })
    );
  }

  // TODO get adminPortalUser$()

}
