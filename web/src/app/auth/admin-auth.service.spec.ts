import {TestBed} from '@angular/core/testing';

import {AdminAuthService} from './admin-auth.service';
import {TestingModule} from '../testing/testing.module';
import {of, throwError} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let angularFireAuth: AngularFireAuth;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
    });
    service = TestBed.inject(AdminAuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAdminPortalUser', () => {
    it('should loadAdminPortalUser', (done) => {
      spyOn(service as any, 'getAdmin').and.returnValue(of({uid: 'admin'}));
      spyOn(service as any, 'logout').and.returnValue(of<void>());
      (service as any).authState$ = of({emailVerified: true, uid: 'admin'} as any);
      service.adminPortalUser$ = undefined;

      (service as any).loadAdminPortalUser();

      expect(service.adminPortalUser$).toBeDefined();
      service.adminPortalUser$.subscribe(res => {
        expect((service as any).getAdmin).toHaveBeenCalledWith('admin');
        expect((service as any).logout).not.toHaveBeenCalled();
        expect(res).toEqual({uid: 'admin'} as any);
        done();
      });
    });

    it('should logout on emailVerified false', (done) => {
      spyOn(service as any, 'getAdmin').and.returnValue(of({uid: 'admin'}));
      spyOn(service as any, 'logout').and.returnValue(of<void>().toPromise());
      (service as any).authState$ = of({emailVerified: false, uid: 'admin'} as any);
      service.adminPortalUser$ = undefined;

      (service as any).loadAdminPortalUser();

      expect(service.adminPortalUser$).toBeDefined();
      service.adminPortalUser$.subscribe(res => {
        expect((service as any).getAdmin).not.toHaveBeenCalledWith('admin');
        expect((service as any).logout).toHaveBeenCalled();
        expect(res).toBeNull();
        done();
      });
    });

    it('should return null on no user', (done) => {
      spyOn(service as any, 'getAdmin').and.returnValue(of({uid: 'admin'}));
      spyOn(service as any, 'logout').and.returnValue(of<void>());
      (service as any).authState$ = of(null);
      service.adminPortalUser$ = undefined;

      (service as any).loadAdminPortalUser();

      expect(service.adminPortalUser$).toBeDefined();
      service.adminPortalUser$.subscribe(res => {
        expect((service as any).getAdmin).not.toHaveBeenCalledWith('admin');
        expect((service as any).logout).not.toHaveBeenCalled();
        expect(res).toBeNull();
        done();
      });
    });
  });

  describe('login', () => {
    it('should login and return userCredential', (done) => {
      spyOn(angularFireAuth, 'signInWithEmailAndPassword').and.returnValue(of({uid: 'admin'} as any).toPromise());

      service.login('email', 'password').then(res => {
        expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
        expect(res).toEqual({uid: 'admin'} as any);
        done();
      });
    });

    it('should handle auth/wrong-password', (done) => {
      spyOn(angularFireAuth, 'signInWithEmailAndPassword').and.returnValue(
        throwError({code: 'auth/wrong-password'}).toPromise()
      );
      spyOn((service as any).eventAuthError, 'next');

      service.login('email', 'password').then(res => {
        expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
        expect((service as any).eventAuthError.next).toHaveBeenCalledWith('Falsches E-mail oder Passwort');
        expect(res).toBeNull();
        done();
      });
    });

    it('should handle auth/user-not-found', (done) => {
      spyOn(angularFireAuth, 'signInWithEmailAndPassword').and.returnValue(
        throwError({code: 'auth/user-not-found'}).toPromise()
      );
      spyOn((service as any).eventAuthError, 'next');

      service.login('email', 'password').then(res => {
        expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
        expect((service as any).eventAuthError.next).toHaveBeenCalledWith('Falsches E-mail oder Passwort');
        expect(res).toBeNull();
        done();
      });
    });

    it('should handle auth/too-many-requests', (done) => {
      spyOn(angularFireAuth, 'signInWithEmailAndPassword').and.returnValue(
        throwError({code: 'auth/too-many-requests'}).toPromise()
      );
      spyOn((service as any).eventAuthError, 'next');

      service.login('email', 'password').then(res => {
        expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
        expect((service as any).eventAuthError.next).toHaveBeenCalledWith('Zu viele Versuche. Versuche es später noch einmals.');
        expect(res).toBeNull();
        done();
      });
    });

    it('should handle other errors', (done) => {
      spyOn(angularFireAuth, 'signInWithEmailAndPassword').and.returnValue(
        throwError({code: 'code', message: 'messsage'}).toPromise()
      );
      spyOn((service as any).eventAuthError, 'next');

      service.login('email', 'password').then(res => {
        expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('email', 'password');
        expect((service as any).eventAuthError.next).toHaveBeenCalledWith('code: messsage');
        expect(res).toBeNull();
        done();
      });
    });
  });

  describe('logout', () => {
    it('should logout', (done) => {
      spyOn(angularFireAuth, 'signOut').and.returnValue(of<void>().toPromise());

      service.logout().then(() => {
        expect(angularFireAuth.signOut).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('resetPassword', () => {
    it('should resetPassword', (done) => {
      spyOn(angularFireAuth, 'sendPasswordResetEmail').and.returnValue(of<void>().toPromise());

      service.resetPassword('email').then(() => {
        expect(angularFireAuth.sendPasswordResetEmail).toHaveBeenCalledWith('email');
        done();
      });
    });
  });

  describe('getAdmin', () => {
    it('should getAdmin', (done) => {
      // @ts-ignore
      const doc = {valueChanges: () => of({uid: 'uid'})};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'valueChanges').and.callThrough();
      spyOn((service as any).eventAuthError, 'next');
      spyOn(service as any, 'logout').and.returnValue(of<void>().toPromise());

      (service as any).getAdmin('uid').subscribe(res => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Admins' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.valueChanges).toHaveBeenCalled();
        expect((service as any).eventAuthError.next).not.toHaveBeenCalledWith('Falsches E-mail oder Passwort');
        expect((service as any).logout).not.toHaveBeenCalled();
        expect(res).toEqual({uid: 'uid'});
        done();
      });
    });

    it('should return null if not found', (done) => {
      // @ts-ignore
      const doc = {valueChanges: () => of(null)};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'valueChanges').and.callThrough();
      spyOn((service as any).eventAuthError, 'next');
      spyOn(service as any, 'logout').and.returnValue(of<void>().toPromise());

      (service as any).getAdmin('uid').subscribe(res => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Admins' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.valueChanges).toHaveBeenCalled();
        expect((service as any).eventAuthError.next).toHaveBeenCalledWith('Falsches E-mail oder Passwort');
        expect((service as any).logout).toHaveBeenCalled();
        expect(res).toBeNull();
        done();
      });
    });
  });
});
