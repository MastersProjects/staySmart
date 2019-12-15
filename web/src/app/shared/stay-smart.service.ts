import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {TutorSearchRequest} from './model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {AngularFireStorage} from '@angular/fire/storage';
import * as uuidv4 from 'uuid/v4';
import {Observable} from 'rxjs';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StaySmartService {

  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage) {
  }

  requestTutorSearch(tutorSearchRequest: TutorSearchRequest): Promise<any> {
    const batch = this.angularFirestore.firestore.batch();
    const tutorSearchRequestId = this.angularFirestore.createId();
    batch.set(
      this.angularFirestore.collection('TutorSearchRequests').doc(tutorSearchRequestId).ref,
      {...tutorSearchRequest.tutorSearchRequestData, timestamp: this.timestamp}
    );
    batch.set(
      this.angularFirestore.collection('TutorSearchRequests').doc(tutorSearchRequestId)
        .collection('ContactData').doc(this.angularFirestore.createId()).ref,
      tutorSearchRequest.tutorSearchRequestContactData
    );
    return batch.commit();
  }

  uploadStudentCard(file: File): Observable<UploadTaskSnapshot> {
    const ref = this.angularFireStorage.ref(`studentCard/${uuidv4()}`);
    const task = ref.put(file);
    return task.snapshotChanges();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
