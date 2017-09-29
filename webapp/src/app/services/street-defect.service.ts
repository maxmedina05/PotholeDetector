import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { StreetDefect } from '../models/street-defect.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class StreetDefectService {

  constructor(private http: Http) {

  }

  getStreetDefects(lat: number, lng: number): Promise<StreetDefect[]> {
    return this.http.get(`${environment.API_BASE_URL}/street-defects?lat=${lat}&lng=${lng}`)
      // .map(response => response.json().data as StreetDefect[]);
      .toPromise()
      .then(response => response.json().data as StreetDefect[])
  }
}
