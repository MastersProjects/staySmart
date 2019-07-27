export interface TutorSearchRequest {
  firstname: string;
  name: string;
  mail: string;
  phone: string;
  subject: string;
  grade: string;
  location: GeoLocation;
  days: {
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

export interface GeoLocation {
  label: string;
  detail: string;
  lon: number;
  lat: number;
  y: number;
  x: number;
  geomStBox2d: string;
}
