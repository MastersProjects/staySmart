import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {TutorSearchRequest} from './model/tutor-search-request.model';
import * as firebase from 'firebase/app';
import {AngularFireStorage} from '@angular/fire/storage';
import * as uuidv4 from 'uuid/v4';
import {from, Observable} from 'rxjs';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {TutorRegistration} from './model/tutor-registration.model';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {GeoLocation} from './model/geo-location.model';

@Injectable({
  providedIn: 'root'
})
export class StaySmartService {

  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage,
              private authService: AuthService) {
  }

  requestTutorSearch(tutorSearchRequest: TutorSearchRequest): Promise<void> {
    const batch = this.angularFirestore.firestore.batch();
    const tutorSearchRequestId = this.angularFirestore.createId();
    batch.set(
      this.angularFirestore.collection('TutorSearchRequests').doc(tutorSearchRequestId).ref,
      {...tutorSearchRequest.tutorSearchRequestData, timestamp: this.serverTimestamp}
    );
    batch.set(
      this.angularFirestore.collection('TutorSearchRequests').doc(tutorSearchRequestId)
        .collection('ContactData').doc(this.angularFirestore.createId()).ref,
      tutorSearchRequest.tutorSearchRequestContactData
    );
    return batch.commit();
  }

  registerNewTutor(registrationForm: RegistrationForm): Observable<void> {
    return this.authService.registerUser(registrationForm.step1.email, registrationForm.step1.password).pipe(
      switchMap(userCredential => {
        return this.uploadStudentCards(registrationForm.step3.studentCardFront, registrationForm.step3.studentCardBack)
          .pipe(map((uploadTaskSnapshots: UploadTaskSnapshot[]) => ({userCredential, uploadTaskSnapshots})));
      }),
      switchMap(result => {
        const uploadTaskFrontSnap = result.uploadTaskSnapshots[0];
        const uploadTaskBackSnap = result.uploadTaskSnapshots[1];
        if (uploadTaskFrontSnap.state === 'success' && uploadTaskBackSnap.state === 'success') {
          const tutorRegistration = this.createTutorRegistration(
            registrationForm, result.userCredential.user.uid,
            uploadTaskFrontSnap.ref.fullPath, uploadTaskBackSnap.ref.fullPath
          );
          return from(this.angularFirestore.collection('Tutors').doc(result.userCredential.user.uid)
            .set({...tutorRegistration, registrationTimestamp: this.serverTimestamp}));
        } else {
          console.log('file upload not successful');
          // TODO error handler
          return null;
        }
      })
    );
  }

  private uploadStudentCards(studentCardFront: File, studentCardBack: File): Observable<UploadTaskSnapshot[]> {
    const frontRef = this.angularFireStorage.ref(`studentCard/${uuidv4()}`);
    const backRef = this.angularFireStorage.ref(`studentCard/${uuidv4()}`);
    return from(Promise.all([frontRef.put(studentCardFront).then(), backRef.put(studentCardBack).then()]));
  }

  private createTutorRegistration(registrationForm: RegistrationForm, uid: string,
                                  studentCardFront: string, studentCardBack: string): TutorRegistration {
    const birthday = registrationForm.step1.birthday;
    const tutorRegistration = {
      uid,
      firstName: registrationForm.step1.firstName,
      lastName: registrationForm.step1.lastName,
      email: registrationForm.step1.email,
      mobileNumber: registrationForm.step1.mobileNumber,
      birthday: new Date(birthday.year, birthday.month - 1, birthday.day),

      streetAddress: registrationForm.step2.streetAddress,
      postalCode: registrationForm.step2.postalCode,
      city: registrationForm.step2.city,

      studentCardFront,
      studentCardBack,
      studentCardExpireDate: registrationForm.step3.studentCardExpireDate,
      education: registrationForm.step3.education,

      subjects: registrationForm.step4.subjects,
      gradeLevels: registrationForm.step4.gradeLevels,
      daysAvailable: registrationForm.step4.daysAvailable,
      price: registrationForm.step4.price,
      attention: registrationForm.step4.attention,

      status: 'new' as const,

      registrationTimestamp: null,

      tags: {
        subjects: {},
        gradeLevels: {},
        daysAvailable: []
      }
    };

    // Creating Tags for matching with Tutor Search Request
    tutorRegistration.subjects.forEach(subject => {
      tutorRegistration.tags.subjects[subject] = true;
    });
    tutorRegistration.gradeLevels.forEach(gradeLevel => {
      tutorRegistration.tags.gradeLevels[gradeLevel] = true;
    });
    Object.keys(tutorRegistration.daysAvailable).forEach(key => {
      if (tutorRegistration.daysAvailable[key]) {
        tutorRegistration.tags.daysAvailable.push(key);
      }
    });

    return tutorRegistration;

  }

  private get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}

interface RegistrationForm {
  step1: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    birthday: {
      day: number;
      month: number;
      year: number;
    };
    password: string;
    repeatPassword: string;
  };
  step2: {
    streetAddress: string;
    postalCode: string;
    city: GeoLocation;
  };
  step3: {
    studentCardFront: File;
    studentCardBack: File;
    studentCardExpireDate: Date;
    education: string;
  };
  step4: {
    subjects: string[];
    gradeLevels: string[];
    daysAvailable: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
    price: number;
    attention: string;
  };

}
