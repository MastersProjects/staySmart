import {GeoLocation} from './geo-location.model';
import {Timestamp} from '@firebase/firestore-types';

export interface TutorSearchRequest {
  tutorSearchRequestData: TutorSearchRequestData;
  tutorSearchRequestContactData: TutorSearchRequestContactData;
}

export interface TutorSearchRequestData {
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
}

export interface TutorSearchRequestContactData {
  email: string;
  phoneNumber: string;
}

