import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Tutor} from '../../shared/model/tutor.model';
import {trace} from '@angular/fire/performance';

@Injectable() // provided in AdminPortalModule
export class AdminPortalService {

  constructor(private angularFirestore: AngularFirestore) { }

  getTutors(): Observable<Tutor[]> {
    return this.angularFirestore.collection<Tutor>('Tutors').valueChanges().pipe(trace('AP: getTutors'));
  }
}
