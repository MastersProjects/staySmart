import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Tutor, TutorStatus} from '../../shared/model/tutor.model';
import {trace} from '@angular/fire/performance';
import {map, shareReplay, tap} from 'rxjs/operators';

@Injectable() // provided in AdminPortalModule
export class AdminPortalService {

  tutors$: Observable<Tutor[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.loadTutors();
  }

  private loadTutors() {
    this.tutors$ = this.angularFirestore.collection<Tutor>('Tutors').valueChanges().pipe(
      tap(() => console.log('tutors$ Subscribed')),
      trace('AP: tutors$'),
      shareReplay(),
    );
  }

  getTutor(uid: string): Observable<Tutor> {
    return this.tutors$.pipe(
      tap(() => console.log('getTutor Subscribed')),
      map(tutors => tutors.find(tutor => tutor.uid === uid)),
      trace('AP: getTutor'),
    );
  }

  verifyTutor(uid: string): Promise<void> {
    return this.angularFirestore.collection<Tutor>('Tutors').doc(uid).update({status: TutorStatus.ACTIVATED});
  }

  changeTutorStatus(status: TutorStatus.ACTIVATED | TutorStatus.DEACTIVATED, uid: string): Promise<void> {
    return this.angularFirestore.collection<Tutor>('Tutors').doc(uid).update({status});
  }
}
