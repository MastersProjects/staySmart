import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Tutor, TutorStatus} from '../../shared/model/tutor.model';
import {trace} from '@angular/fire/performance';
import {map, shareReplay, tap} from 'rxjs/operators';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import {AngularFireFunctions} from '@angular/fire/functions';

@Injectable() // provided in AdminPortalModule
export class AdminPortalService {

  tutors$: Observable<Tutor[]>;
  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;

  constructor(private angularFirestore: AngularFirestore, private angularFireFunctions: AngularFireFunctions) {
    this.initTutorsObservable();
    this.initTutorSearchRequestsObservable();
  }

  private initTutorsObservable() {
    this.tutors$ = this.angularFirestore.collection<Tutor>('Tutors').valueChanges().pipe(
      tap(() => console.log('tutors$ Subscribed')),
      trace('AP: tutors$'),
      shareReplay(),
    );
  }

  private initTutorSearchRequestsObservable(): void {
    this.tutorSearchRequests$ = this.angularFirestore.collection<TutorSearchRequestData>(
      'TutorSearchRequests',
      ref => ref.orderBy('timestamp', 'desc')
    ).valueChanges({idField: 'id'}).pipe(
      tap(() => console.log('tutorSearchRequests$ Subscribed')),
      trace('AP: tutorSearchRequests$'),
      shareReplay(),
    );
  }

  // FIXME when on List View and at that time a new Tutor register and want to view the new Tutor Detail it fails.
  getTutor(uid: string): Observable<Tutor> {
    return this.tutors$.pipe(
      tap(() => console.log('getTutor Subscribed')),
      map(tutors => tutors.find(tutor => tutor.uid === uid)),
      trace('AP: getTutor'),
    );
  }

  getTutorSearchRequest(tutorSearchRequestID: string): Observable<TutorSearchRequestData> {
    return this.tutorSearchRequests$.pipe(
      tap(() => console.log('getTutorSearchRequest Subscribed')),
      map(tutorsSearchRequests => tutorsSearchRequests.find(request => request.id === tutorSearchRequestID)),
      trace('AP: getTutorSearchRequest'),
    );
  }

  getTutorSearchRequestOffers(tutorSearchRequestID: string): Observable<TutorSearchRequestOffer[]> {
    return this.angularFirestore
      .collection('TutorSearchRequests')
      .doc(tutorSearchRequestID)
      .collection<TutorSearchRequestOffer>(
        'TutorSearchRequestOffers',
        ref => ref.orderBy('status')
      ).valueChanges({idField: 'id'}).pipe(
        trace('AP: getTutorSearchRequestOffers')
      );
  }

  getAllTutorSearchRequestOffers(): Observable<TutorSearchRequestOffer[]> {
    return this.angularFirestore
      .collectionGroup<TutorSearchRequestOffer>(
        'TutorSearchRequestOffers',
        ref => ref.orderBy('timestamp', 'desc')
      ).snapshotChanges().pipe(
        map(snapshots => {
          return snapshots.map(snapshot => ({...snapshot.payload.doc.data(), id: snapshot.payload.doc.id}));
        }),
        trace('AP: getAllTutorSearchRequestOffers')
      );
  }

  async activateTutor(tutor: Tutor): Promise<void> {
    await this.angularFirestore.collection<Tutor>('Tutors').doc(tutor.uid).update({status: TutorStatus.ACTIVATED});
    return this.angularFireFunctions.httpsCallable('sendTutorActivatedEmail')({
      tutorName: tutor.firstName,
      tutorEmail: tutor.email,
    }).toPromise();
  }

  changeTutorStatus(status: TutorStatus.ACTIVATED | TutorStatus.DEACTIVATED, uid: string): Promise<void> {
    return this.angularFirestore.collection<Tutor>('Tutors').doc(uid).update({status});
  }

  async changeTutorVerification(isVerified: boolean, tutor: Tutor): Promise<void> {
    const updatePromise = this.angularFirestore.collection<Tutor>('Tutors').doc(tutor.uid).update({isVerified});
    if (isVerified) {
      await updatePromise;
      return this.angularFireFunctions.httpsCallable('sendTutorVerifiedEmail')({
        tutorName: tutor.firstName,
        tutorEmail: tutor.email,
      }).toPromise();
    } else {
      return updatePromise;
    }
  }
}
