import {GeoLocation} from './geo-location.model';
import {Timestamp} from '@firebase/firestore-types';

export interface TutorSearchRequest {
  tutorSearchRequestData: TutorSearchRequestData;
  tutorSearchRequestContactData: TutorSearchRequestContactData;
  tutorSearchRequestOffers?: TutorSearchRequestOffer[];
}

export interface TutorSearchRequestData {
  id?: string;
  firstName: string;
  lastName: string;
  subject: string;
  gradeLevel: string;
  location: GeoLocation;
  daysAvailable: {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
  };
  budget: number;
  problem: string;
  timestamp: Timestamp;
  status: 'new' | 'mediated';
}

export interface TutorSearchRequestContactData {
  email: string;
  phoneNumber: string;
}

export interface TutorSearchRequestOffer {
  id?: string;
  uid: string;
  firstName: string;
  lastName: string;
  /* TODO profilePicture: string;*/
  message: string;
  price: number;
  timestamp: Timestamp;
  status: 'new' | 'accepted' | 'declined';
}

