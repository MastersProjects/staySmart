import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {TutorSearchRequest} from './model/tutor-search-request.model';

@Injectable({
  providedIn: 'root'
})
export class StaySmartService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  requestTutorSearch(tutorSearchRequest: TutorSearchRequest): Promise<any> {
    return this.angularFirestore.collection('TutorSearchRequests')
      .add({...tutorSearchRequest, timestamp: new Date()});
  }
}
