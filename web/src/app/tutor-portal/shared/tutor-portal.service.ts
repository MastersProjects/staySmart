import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {TutorAuthService} from '../../auth/tutor-auth.service';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirePerformance} from '@angular/fire/performance';
import {AngularFireStorage} from '@angular/fire/storage';
import {Tutor} from '../../shared/model/tutor.model';

@Injectable() // provided in TutorPortalModule
export class TutorPortalService {

  constructor(private angularFirestore: AngularFirestore, private authService: TutorAuthService,
              private angularFirePerformance: AngularFirePerformance, private angularFireStorage: AngularFireStorage) {
  }

  getTutorSearchRequests(): Observable<TutorSearchRequestData[]> {
    return this.angularFirestore.collection<TutorSearchRequestData>(
      'TutorSearchRequests',
      ref => ref.where('status', '==', 'new').orderBy('timestamp', 'desc')
    ).valueChanges({idField: 'id'}).pipe(
      this.angularFirePerformance.trace('getTutorSearchRequests')
    );
  }

  getMatchingTutorSearchRequests(): Observable<TutorSearchRequestData[]> {
    return this.authService.tutorPortalUser$.pipe(
      switchMap(tutor => {
        if (tutor && tutor.matchingTutorSearchRequests && tutor.matchingTutorSearchRequests.length !== 0) {
          return this.angularFirestore.collection<TutorSearchRequestData>(
            'TutorSearchRequests',
            ref => ref
              .where('status', '==', 'new')
              .where(firebase.firestore.FieldPath.documentId(), 'in', tutor.matchingTutorSearchRequests)
          ).valueChanges({idField: 'id'});
        } else {
          return of(null);
        }
      }),
      this.angularFirePerformance.trace('getMatchingTutorSearchRequests')
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
                                    tutorSearchRequestData: TutorSearchRequestData):
    Promise<[void, firebase.firestore.DocumentReference]> {

    const tutorPortalUser = await this.authService.tutorPortalUser;
    const {uid, firstName, lastName, profilePicture} = tutorPortalUser;
    const offer = {
      ...tutorSearchRequestOffer,
      uid,
      firstName,
      lastName,
      timestamp: this.serverTimestamp,
      status: 'new',
      profilePicture,
      tutorSearchRequest: {
        tutorSearchRequestData
      }
    };

    const sentOffers = tutorPortalUser.sentOffers ?
      [...tutorPortalUser.sentOffers, tutorSearchRequestData.id] : [tutorSearchRequestData.id];

    const matchingTutorSearchRequests = tutorPortalUser.matchingTutorSearchRequests
      .filter(request => request !== tutorSearchRequestData.id);

    const updatePortalUser = this.angularFirestore.collection('Tutors').doc(tutorPortalUser.uid)
      .update({sentOffers, matchingTutorSearchRequests});

    const addOffer = this.angularFirestore.collection(
      `TutorSearchRequests/${tutorSearchRequestData.id}/TutorSearchRequestOffers`
    ).add(offer);

    return Promise.all([updatePortalUser, addOffer]);
  }

  async uploadProfilePicture(profilePicture: string, tutor: Tutor) {
    const ref = this.angularFireStorage.ref(`profilePicture/${tutor.uid}`);
    const task = await ref.putString(
      profilePicture.replace('data:image/png;base64,', ''),
      'base64',
      {contentType: 'image/png'}
    );
    const downloadUrl = await task.ref.getDownloadURL();
    return this.angularFirestore.collection('Tutors').doc(tutor.uid).update({
      profilePicture: {
        downloadUrl,
        fullPath: task.ref.fullPath
      }
    });
  }

  getTutorPortalSentOffers(): Observable<TutorSearchRequestOffer[]> {
    return this.authService.tutorPortalUser$.pipe(
      switchMap(tutorPortalUser => {
        return this.angularFirestore.collectionGroup<TutorSearchRequestOffer>(
          'TutorSearchRequestOffers',
          query => query.where('uid', '==', tutorPortalUser.uid)
        ).snapshotChanges();
      }),
      map(snapshots => {
        return snapshots.map(snapshot => ({...snapshot.payload.doc.data(), id: snapshot.payload.doc.id}));
      }),
      this.angularFirePerformance.trace('getTutorPortalSentOffers')
    );
  }

  private get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
