import {GeoLocation} from './geo-location.model';
import {Image} from './image.model';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Tutor {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  birthday: Date | Timestamp;

  streetAddress: string;
  postalCode: string;
  location: GeoLocation;

  studentCardFront: Image;
  studentCardBack: Image;
  studentCardExpireDate: Date;
  education: string;

  subjects: string[];
  gradeLevels: string[];
  daysAvailable: {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
  };
  price: number;
  attention: string;

  status: TutorStatus;

  registrationTimestamp: Date;

  matchingTutorSearchRequests?: string[];
  sentOffers?: string[];

  tags?: any;

  profilePicture?: Image;
}

export enum TutorStatus {
  NEW = 'new',
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated'
}
