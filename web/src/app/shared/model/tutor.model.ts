import {GeoLocation} from './geo-location.model';
import {Image} from './image.model';

export interface Tutor {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  birthday: Date;

  streetAddress: string;
  postalCode: string;
  city: GeoLocation;

  studentCardFront: string; // TODO same as profilePicture
  studentCardBack: string; // TODO same as profilePicture
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

  status: 'new' | 'activated' | 'deactivated';

  registrationTimestamp: Date;

  matchingTutorSearchRequests?: string[];
  sentOffers?: string[];

  tags?: any;

  profilePicture?: Image;
}
