import {TestBed} from '@angular/core/testing';

import {AdminPortalService} from './admin-portal.service';
import {TestingModule} from '../../testing/testing.module';
import {of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {TutorStatus} from '../../shared/model/tutor.model';
import any = jasmine.any;

describe('AdminPortalService', () => {
  let service: AdminPortalService;
  let angularFirestore: AngularFirestore;
  let angularFireFunctions: AngularFireFunctions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      providers: [
        AdminPortalService,
      ],
    });
    service = TestBed.inject(AdminPortalService);
    angularFirestore = TestBed.inject(AngularFirestore);
    angularFireFunctions = TestBed.inject(AngularFireFunctions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTutor', () => {
    it('should getTutor by uid', (done) => {
      service.tutors$ = of([
        {uid: '1', firstName: '1'},
        {uid: '2', firstName: '2'},
        {uid: '3', firstName: '3'},
      ]) as any;

      service.getTutor('2').subscribe(res => {
        expect(res).toEqual({uid: '2', firstName: '2'} as any);
        done();
      });
    });
  });

  describe('getTutorSearchRequest', () => {
    it('should getTutorSearchRequest by id', (done) => {
      service.tutorSearchRequests$ = of([
        {id: '1', firstName: '1'},
        {id: '2', firstName: '2'},
        {id: '3', firstName: '3'},
      ]) as any;

      service.getTutorSearchRequest('2').subscribe(res => {
        expect(res).toEqual({id: '2', firstName: '2'} as any);
        done();
      });
    });
  });

  describe('getTutorSearchRequestOffers', () => {
    it('should getTutorSearchRequestOffers', (done) => {
      // @ts-ignore
      const collectionValueChanges = {valueChanges: (obj: any) => of({id: 'id'})};
      // @ts-ignore
      const doc = {collection: (path: string, fun: any) => collectionValueChanges};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'collection').and.callThrough();
      spyOn(collectionValueChanges, 'valueChanges').and.callThrough();

      service.getTutorSearchRequestOffers('id').subscribe(res => {
        expect(res).toEqual({id: 'id'} as any);
        expect(angularFirestore.collection).toHaveBeenCalledWith('TutorSearchRequests' as any);
        expect(collection.doc).toHaveBeenCalledWith('id');
        expect(doc.collection).toHaveBeenCalledWith(
          'TutorSearchRequestOffers',
          any(Function)
        );
        expect(collectionValueChanges.valueChanges).toHaveBeenCalledWith({idField: 'id'});
        done();
      });
    });
  });

  describe('getAllTutorSearchRequestOffers', () => {
    it('should getAllTutorSearchRequestOffers', (done) => {
      // @ts-ignore
      const collectionGroup = {valueChanges: (obj: any) => of([{id: 'id'}])};
      spyOn(angularFirestore, 'collectionGroup').and.returnValue(collectionGroup as any);
      spyOn(collectionGroup, 'valueChanges').and.callThrough();

      service.getAllTutorSearchRequestOffers().subscribe(res => {
        expect(res).toEqual([{id: 'id'}] as any);
        expect(angularFirestore.collectionGroup).toHaveBeenCalledWith(
          'TutorSearchRequestOffers',
          any(Function)
        );
        expect(collectionGroup.valueChanges).toHaveBeenCalledWith({idField: 'id'});
        done();
      });
    });
  });

  describe('activateTutor', () => {
    it('should activateTutor', (done) => {
      // @ts-ignore
      const doc = {update: (object: any) => of<void>().toPromise()};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'update').and.callThrough();

      // @ts-ignore
      const fun = jasmine.createSpy().and.callFake((data: any) => of<void>());
      spyOn(angularFireFunctions, 'httpsCallable').and.returnValue(fun);


      service.activateTutor({uid: 'uid', firstName: 'firstName', email: 'email'} as any).then(() => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Tutors' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.update).toHaveBeenCalledWith({status: TutorStatus.ACTIVATED});
        expect(angularFireFunctions.httpsCallable).toHaveBeenCalledWith('sendTutorActivatedEmail');
        expect(fun).toHaveBeenCalledWith({tutorName: 'firstName', tutorEmail: 'email'});
        done();
      });
    });
  });

  describe('changeTutorStatus', () => {
    it('should changeTutorStatus to ACTIVATED', (done) => {
      // @ts-ignore
      const doc = {update: (object: any) => of<void>().toPromise()};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'update').and.callThrough();

      service.changeTutorStatus(TutorStatus.ACTIVATED, 'uid').then(() => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Tutors' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.update).toHaveBeenCalledWith({status: TutorStatus.ACTIVATED});
        done();
      });
    });

    it('should changeTutorStatus to DEACTIVATED', (done) => {
      // @ts-ignore
      const doc = {update: (object: any) => of<void>().toPromise()};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'update').and.callThrough();

      service.changeTutorStatus(TutorStatus.DEACTIVATED, 'uid').then(() => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Tutors' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.update).toHaveBeenCalledWith({status: TutorStatus.DEACTIVATED});
        done();
      });
    });
  });

  describe('changeTutorVerification', () => {
    it('should changeTutorVerification to true', (done) => {
      // @ts-ignore
      const doc = {update: (object: any) => of<void>().toPromise()};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'update').and.callThrough();

      // @ts-ignore
      const fun = jasmine.createSpy().and.callFake((data: any) => of<void>());
      spyOn(angularFireFunctions, 'httpsCallable').and.returnValue(fun);


      service.changeTutorVerification(true, {uid: 'uid', firstName: 'firstName', email: 'email'} as any).then(() => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Tutors' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.update).toHaveBeenCalledWith({isVerified: true});
        expect(angularFireFunctions.httpsCallable).toHaveBeenCalledWith('sendTutorVerifiedEmail');
        expect(fun).toHaveBeenCalledWith({tutorName: 'firstName', tutorEmail: 'email'});
        done();
      });
    });

    it('should changeTutorVerification to false', (done) => {
      // @ts-ignore
      const doc = {update: (object: any) => of<void>().toPromise()};
      // @ts-ignore
      const collection = {doc: (docId: string) => doc};
      spyOn(angularFirestore, 'collection').and.returnValue(collection as any);
      spyOn(collection, 'doc').and.callThrough();
      spyOn(doc, 'update').and.callThrough();

      // @ts-ignore
      const fun = jasmine.createSpy().and.callFake((data: any) => of<void>());
      spyOn(angularFireFunctions, 'httpsCallable').and.returnValue(fun);


      service.changeTutorVerification(false, {uid: 'uid', firstName: 'firstName', email: 'email'} as any).then(() => {
        expect(angularFirestore.collection).toHaveBeenCalledWith('Tutors' as any);
        expect(collection.doc).toHaveBeenCalledWith('uid');
        expect(doc.update).toHaveBeenCalledWith({isVerified: false});
        expect(angularFireFunctions.httpsCallable).not.toHaveBeenCalledWith('sendTutorVerifiedEmail');
        expect(fun).not.toHaveBeenCalledWith({tutorName: 'firstName', tutorEmail: 'email'});
        done();
      });
    });
  });
});
