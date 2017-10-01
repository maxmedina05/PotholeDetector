import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { StreetDefect } from '../models/street-defect.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StreetDefectService {

  constructor(private http: Http) {

  }

  getStreetDefects(lat: number, lng: number, radix: number): Promise<StreetDefect[]> {
    return this.http.get(`${environment.API_BASE_URL}/street-defects?lat=${lat}&lng=${lng}&radix=${radix}`)
      .toPromise()
      .then(response => response.json().data as StreetDefect[])
      .catch(err => {
        console.log(err)
      })
  }
}
