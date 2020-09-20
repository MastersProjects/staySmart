import {GeoLocation} from './geo-location.model';
import {Timestamp} from '@firebase/firestore-types';
import {Image} from './image.model';
import {FirePoint} from 'geofirex/dist/client';

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
  status: TutorSearchRequestStatus;
  point: FirePoint; // Future proofing for #61
}

export enum TutorSearchRequestStatus {
  NEW = 'new',
  MEDIATED = 'mediated',
}

export interface TutorSearchRequestContactData {
  email: string;
  phoneNumber: string;
  linkRef?: string;
}

export interface TutorSearchRequestOffer {
  id?: string;
  uid: string;
  firstName: string;
  lastName: string;
  profilePicture?: Image;
  message: string;
  price: number;
  timestamp: Timestamp;
  status: TutorSearchRequestOfferStatus;
  tutorSearchRequest?: {
    tutorSearchRequestData?: TutorSearchRequestData;
    tutorSearchRequestContactData?: {
      email: string;
      phoneNumber: string;
    };
  };
  isVerified: boolean;
}

export enum TutorSearchRequestOfferStatus {
  NEW = 'new',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

