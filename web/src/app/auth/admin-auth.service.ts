import {Injectable} from '@angular/core';
import {from, Observable, of, Subject} from 'rxjs';
import {User} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {trace} from '@angular/fire/performance';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {Admin} from '../shared/model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private eventAuthError = new Subject<string>(); // subject is private so it can only be written inside the service
  eventAuthError$ = this.eventAuthError.asObservable(); // public accessible subject as a observable so it can be subscribed
  private authState$: Observable<User | null>;
  adminPortalUser$: Observable<Admin | null>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.loadAuthState();
    this.loadAdminPortalUser();
  }

  private loadAuthState() {
    this.authState$ = this.angularFireAuth.authState.pipe(
      tap(() => console.log('authState Subscribed')),
      trace('authState$')
    );
  }

  private loadAdminPortalUser() {
    this.adminPortalUser$ = this.authState$.pipe(
      tap(() => console.log('adminPortalUser$ Subscribed')),
      switchMap(user => {
        if (user) {
          if (user.emailVerified) {
            return this.getAdmin(user.uid);
          } else {
            console.log('E-Mail not verified');
            return from(this.logout()).pipe(map(() => null));
          }
        } else {
          return of(null);
        }
      }),
      trace('adminPortalUser$'),
      shareReplay({bufferSize: 1, refCount: true})
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

  private getAdmin(uid: string): Observable<Admin | null> {
    return this.angularFirestore.collection('Admins').doc(uid).valueChanges().pipe(
      switchMap(admin => {
        console.log('getAdmin', admin);
        if (admin) {
          return of(admin);
        } else {
          console.log(`Admin ${uid} doesn't exist in Firestore`);
          this.eventAuthError.next('Falsches E-mail oder Passwort');
          return from(this.logout()).pipe(map(() => null)); // mapping because we need Observable<null> instead of Observable<void>
        }
      }),
      trace('getAdmin')
    );
  }
}
