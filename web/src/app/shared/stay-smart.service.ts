import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {TutorSearchRequest} from './model/tutor-search-request.model';

@Injectable({
  providedIn: 'root'
})
export class StaySmartService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  requestTutorSearch(tutorSearchRequest: TutorSearchRequest): Promise<any>[] {
    const id = this.angularFirestore.createId();
    return [
      this.angularFirestore.collection('TutorSearchRequests').doc(id)
        .set({...tutorSearchRequest.tutorSearchRequestData, timestamp: new Date()}),
      this.angularFirestore.collection('TutorSearchRequests').doc(id)
        .collection('ContactData').add(tutorSearchRequest.tutorSearchRequestContactData)
    ];
  }
}
