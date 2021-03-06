import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of, Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import {User} from 'firebase/app';
import {map, shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Tutor} from '../shared/model/tutor.model';
import {trace} from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})
export class TutorAuthService {

  private eventAuthError = new Subject<string>(); // subject is private so it can only be written inside the service
  eventAuthError$ = this.eventAuthError.asObservable(); // public accessible subject as a observable so it can be subscribed
  private authState$: Observable<User | null>;
  tutorPortalUser$: Observable<Tutor | null>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.loadAuthState();
    this.loadTutorPortalUser();
  }

  private loadAuthState() {
    this.authState$ = this.angularFireAuth.authState.pipe(
      tap(() => console.log('authState Subscribed')),
      trace('authState$')
    );
  }

  private loadTutorPortalUser() {
    this.tutorPortalUser$ = this.authState$.pipe(
      tap(() => console.log('tutorPortalUser$ Subscribed')),
      switchMap(user => {
        if (user) {
          if (user.emailVerified) {
            return this.getTutor(user.uid);
          } else {
            console.log('E-Mail not verified');
            return from(this.logout()).pipe(map(() => null));
          }
        } else {
          return of(null);
        }
      }),
      trace('tutorPortalUser$'),
      shareReplay(
        {bufferSize: 1, refCount: true}
      )
    );
  }

  registerUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(userCredential => userCredential.user.sendEmailVerification())
    );
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('login error', error);
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          this.eventAuthError.next('Falsches E-mail oder Passwort');
        } else if (error.code === 'auth/too-many-requests') {
          this.eventAuthError.next('Zu viele Versuche. Versuche es später noch einmals.');
        } else {
          this.eventAuthError.next(`${error.code}: ${error.message}`);
        }
        return null;
      });
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  get tutorPortalUser(): Promise<Tutor | null> {
    return this.tutorPortalUser$.pipe(take(1)).toPromise();
  }

  private getTutor(uid: string): Observable<Tutor | null> {
    return this.angularFirestore.collection('Tutors').doc(uid).valueChanges().pipe(
      switchMap(tutor => {
        console.log('getTutor', tutor);
        if (tutor) {
          return of(tutor);
        } else {
          console.log(`Tutor ${uid} doesn't exist in Firestore`);
          this.eventAuthError.next('Falsches E-mail oder Passwort');
          return from(this.logout()).pipe(map(() => null)); // mapping because we need Observable<null> instead of Observable<void>
        }
      }),
      trace('getTutor')
    );
  }

}
