import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {AuthService} from '../../auth/auth.service';
import {switchMap} from 'rxjs/operators';
import {AngularFirePerformance} from '@angular/fire/performance';
import {AngularFireStorage} from '@angular/fire/storage';
import {Tutor} from '../../shared/model/tutor.model';

@Injectable() // provided in TutorPortalModule
export class TutorPortalService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService,
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
        if (tutor) {
          return this.angularFirestore.collection<TutorSearchRequestData>(
            'TutorSearchRequests',
            ref => ref
              .where('status', '==', 'new')
              // @ts-ignore
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
                                    tutorSearchRequestId: string): Promise<[void, firebase.firestore.DocumentReference]> {
    const tutorPortalUser = await this.authService.tutorPortalUser;
    const {uid, firstName, lastName, profilePicture} = tutorPortalUser;
    const offer = {
      ...tutorSearchRequestOffer,
      uid,
      firstName,
      lastName,
      timestamp: this.serverTimestamp,
      status: 'new',
      profilePicture
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

  private get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
