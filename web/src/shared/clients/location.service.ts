import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  searchLocation(query: string): any {
    if (query === '') {
      return of([]);
    }

    PARAMS.searchText = query;
    return this.http.get(GEO_URL, {params: PARAMS}).pipe(
      map(response => response['results'])
    );;
  }

}
