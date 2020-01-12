import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {TutorSearchRequestData, TutorSearchRequestOffer} from '../../shared/model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {DocumentReference} from '@angular/fire/firestore/interfaces';
import {AuthService} from '../../auth/auth.service';

@Injectable() // provided in TutorPortalModule
export class TutorPortalService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) {
  }

  getTutorSearchRequests(): Observable<TutorSearchRequestData[]> {
    return this.angularFirestore.collection<TutorSearchRequestData>(
      'TutorSearchRequests', ref => ref.orderBy('timestamp', 'desc')
    ).valueChanges({idField: 'id'});
  }

  async sendTutorSearchRequestOffer(tutorSearchRequestOffer: TutorSearchRequestOffer,
                                    tutorSearchRequestId: string): Promise<DocumentReference> {
    const tutorPortalUser = await this.authService.tutorPortalUser;

    const offer = {
      ...tutorSearchRequestOffer,
      firstName: tutorPortalUser.firstName,
      lastName: tutorPortalUser.lastName,
      timestamp: this.serverTimestamp
    }; // TODO Profile Picture

    return this.angularFirestore.collection(
      `TutorSearchRequests/${tutorSearchRequestId}/TutorSearchRequestOffers`
    ).add(offer);
  }

  private get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
