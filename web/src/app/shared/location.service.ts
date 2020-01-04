import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeoLocation} from './model/geo-location.model';

const GEO_URL = 'https://api3.geo.admin.ch/rest/services/api/SearchServer';
const PARAMS = {
  type: 'locations',
  origins: 'gg25',
  searchText: ''
};

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient) {
  }

  searchLocation(searchText: string): Observable<GeoLocation[]> {
    if (searchText === '') {
      return of([]);
    }

    return this.http.get<any>(GEO_URL, {params: {...PARAMS, searchText}}).pipe(
      map(res => {
        return res.results.map(item => {
          return {
            label: item.attrs.label.replace(/<[^>]*>/g, ''),
            detail: item.attrs.detail,
            lon: item.attrs.lon,
            lat: item.attrs.lat,
            y: item.attrs.y,
            x: item.attrs.x,
            geomStBox2d: item.attrs.geom_st_box2d,
          };
        });
      })
    );
  }
}
