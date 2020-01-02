import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of, Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Tutor} from '../shared/model/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private eventAuthError = new Subject<string>(); // subject is private so it can only be written inside the service
  eventAuthError$ = this.eventAuthError.asObservable(); // public accessible subject as a observable so it can be subscribed

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).catch(err => {
      console.log('login error', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        this.eventAuthError.next('Falsches E-mail oder Passwort');
      } else if (err.code === 'auth/too-many-requests') {
        this.eventAuthError.next('Zu viele Versuche. Versuche es später noch einmals.');
      } else {
        this.eventAuthError.next(`${err.code}: ${err.message}`);
      }
      return null;
    });
  }

  logout(): Observable<void> {
    return from(this.angularFireAuth.auth.signOut());
  }

  resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
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

  get isLoggedIn$(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map(authState => !!authState)
    );
  }

  private getTutor(uid: string): Observable<Tutor | null> {
    return this.angularFirestore.collection('Tutors').doc(uid).valueChanges().pipe(
      switchMap(tutor => {
        console.log('tutor', tutor);
        if (tutor) {
          return of(tutor);
        } else {
          console.log(`Tutor ${uid} doesn't exist in Firestore`);
          this.eventAuthError.next('Falsches E-mail oder Passwort');
          return this.logout().pipe(map(() => null)); // mapping because we need Observable<null> instead of Observable<void>
        }
      })
    );
  }

  // TODO get adminPortalUser$()

}
