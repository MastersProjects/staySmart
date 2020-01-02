import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable() // provided in TutorPortalModule
export class TutorPortalService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getTutorSearchRequests(): Observable<any[]> {
    return this.angularFirestore.collection('TutorSearchRequests').valueChanges();
  }

}
