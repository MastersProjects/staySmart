import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Tutor, TutorStatus} from '../../shared/model/tutor.model';
import {trace} from '@angular/fire/performance';
import {map, shareReplay, tap} from 'rxjs/operators';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';

@Injectable() // provided in AdminPortalModule
export class AdminPortalService {

  tutors$: Observable<Tutor[]>;
  tutorSearchRequests$: Observable<TutorSearchRequestData[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.loadTutors();
    this.initTutorSearchRequestsObservable();
  }

  private loadTutors() {
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

  verifyTutor(uid: string): Promise<void> {
    return this.angularFirestore.collection<Tutor>('Tutors').doc(uid).update({status: TutorStatus.ACTIVATED});
  }

  changeTutorStatus(status: TutorStatus.ACTIVATED | TutorStatus.DEACTIVATED, uid: string): Promise<void> {
    return this.angularFirestore.collection<Tutor>('Tutors').doc(uid).update({status});
  }
}
