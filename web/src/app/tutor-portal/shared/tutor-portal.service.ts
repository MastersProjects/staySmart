import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {AuthService} from '../../auth/auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable() // provided in TutorPortalModule
export class TutorPortalService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) {
  }

  getTutorSearchRequests(): Observable<TutorSearchRequestData[]> {
    return this.angularFirestore.collection<TutorSearchRequestData>(
      'TutorSearchRequests',
      ref => ref.where('status', '==', 'new').orderBy('timestamp', 'desc')
    ).valueChanges({idField: 'id'});
  }

  getMatchingTutorSearchRequests(): Observable<TutorSearchRequestData[]> {
    return this.authService.tutorPortalUser$.pipe(
      switchMap(tutor => {
        if (tutor) {
          return this.angularFirestore.collection<TutorSearchRequestData>(
            'TutorSearchRequests',
            ref => ref
              .where('status', '==', 'new')
              // @ts-ignore
              .where(firebase.firestore.FieldPath.documentId(), 'in', tutor.matchingTutorSearchRequests)
          ).valueChanges({idField: 'id'});
        }
      })
    );
  }

  async declineMatchingTutorSearchRequest(tutorSearchRequestID: string): Promise<void> {
    const tutorPortalUser = await this.authService.tutorPortalUser;
    const matchingTutorSearchRequests = tutorPortalUser.matchingTutorSearchRequests
      .filter(request => request !== tutorSearchRequestID);
    return this.angularFirestore.collection('Tutors').doc(tutorPortalUser.uid).update(
      {matchingTutorSearchRequests}
    );
  }

  async sendTutorSearchRequestOffer(tutorSearchRequestOffer: TutorSearchRequestOffer,
                                    tutorSearchRequestId: string): Promise<[void, firebase.firestore.DocumentReference]> {
    const tutorPortalUser = await this.authService.tutorPortalUser;

    const offer = {
      ...tutorSearchRequestOffer,
      uid: tutorPortalUser.uid,
      firstName: tutorPortalUser.firstName,
      lastName: tutorPortalUser.lastName,
      timestamp: this.serverTimestamp,
      status: 'new'
    }; // TODO Profile Picture

    const sentOffers = tutorPortalUser.sentOffers ?
      [...tutorPortalUser.sentOffers, tutorSearchRequestId] : [tutorSearchRequestId];

    const updatePortalUser = this.angularFirestore.collection('Tutors').doc(tutorPortalUser.uid)
      .update({sentOffers});

    const addOffer = this.angularFirestore.collection(
      `TutorSearchRequests/${tutorSearchRequestId}/TutorSearchRequestOffers`
    ).add(offer);

    return Promise.all([updatePortalUser, addOffer]);
  }

  private get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
