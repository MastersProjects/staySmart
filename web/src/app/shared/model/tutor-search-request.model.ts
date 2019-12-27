import {GeoLocation} from './geo-location.model';

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
  timestamp: Date;
}

export interface TutorSearchRequestContactData {
  email: string;
  phoneNumber: string;
}

