export class RequestForm {
    firstname: string;
    name: string;
    mail: string;
    phone: string;
    subject: string;
    grade: string;
    location: GeoLocation;
    days: {monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean};
    budget: number;
    problem: string;

    constructor() {
        this.days = {monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false};
    }
}

export class GeoLocation {
    label: string;
    detail: string;
    lon: number;
    lat: number;
    y: number;
    x: number;
    geomStBox2d: string;

    public constructor(label: string, detail: string, lon: number, lat: number, y: number, x: number, geomStBox2d: string) {
        this.label = label;
        this.detail = detail;
        this.lon = lon;
        this.lat = lat;
        this.y = y;
        this.x = x;
        this.geomStBox2d = geomStBox2d;
    }
}
