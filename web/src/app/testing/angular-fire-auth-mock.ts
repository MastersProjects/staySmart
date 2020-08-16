import {Observable, of} from 'rxjs';
import {User} from 'firebase/app';
import {tap} from 'rxjs/operators';

export class AngularFireAuthMock {
  authState: Observable<User | null> = of(
    {
      emailVerified: true,
      uid: '3voAW6ygSHQCggXIecTGJ4htNls2',
    } as User
  ).pipe(
    tap(() => console.log('authState mock'))
  );

  signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    console.log('signInWithEmailAndPassword mock', email, password);
    return Promise.resolve(undefined);
  }

  signOut(): Promise<void> {
    console.log('signOut mock');
    return Promise.resolve(undefined);
  }

  sendPasswordResetEmail(email: string) {
    console.log('sendPasswordResetEmail mock', email);
    return Promise.resolve(undefined);
  }
}
