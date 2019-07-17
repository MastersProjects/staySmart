export class RequestForm {
    firstname: string;
    name: string;
    mail: string;
    phone: string;
    subject: string;
    grade: string;
    location: GeoLocation;
    time: string;
    budget: number;
    problem: string;
}

export class GeoLocation {
    label: string;
    detail: string;
    lon: number;
    lat: number;
    y: number;
    x: number;
    geom_st_box2d: string;

    public constructor(label: string, detail: string, lon: number, lat: number, y: number, x: number, geom_st_box2d: string) {
        this.label = label;
        this.detail = detail;
        this.lon = lon;
        this.lat = lat;
        this.y = y;
        this.x = x;
        this.geom_st_box2d = geom_st_box2d;
    }
}