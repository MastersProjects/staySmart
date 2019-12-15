import {GeoLocation} from './geo-location.model';

export interface TutorRegistration {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  birthday: Date;

  streetAddress: string;
  postalCode: string;
  city: GeoLocation;

  studentCardFront: string;
  studentCardBack: string;
  studentCardExpireDate: Date;
  education: string;

  subjects: string[];
  gradeLevel: string;
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

  status: 'new';

}
