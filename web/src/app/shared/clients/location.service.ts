import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { GeoLocation } from '../model/requestForm';

const GEO_URL = 'https://api3.geo.admin.ch/rest/services/api/SearchServer';
const PARAMS = {
  type: 'locations',
  origins: 'gg25',
  searchText: '*'
};

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient) {
  }

  searchLocation(query: string): Observable<GeoLocation[]> {
    if (query === '') {
      return of([]);
    }

    PARAMS.searchText = query;
    const resultKey = 'results';
    const itemKey = 'attrs';
    return this.http.get<GeoLocation[]>(GEO_URL, {params: PARAMS}).pipe(
      map(res =>  {
        return res[resultKey].map(item => {
          item = item[itemKey];
          const location = new GeoLocation(item.label, item.detail, item.lon, item.lat, item.y, item.x, item.geom_st_box2d);
          return location;
        });
      })
    );
  }
}
