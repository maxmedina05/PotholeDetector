import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StreetDefect } from '../models/street-defect.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StreetDefectService {

  constructor(private http: HttpClient) {

  }

  getStreetDefects(lat: number, lng: number, radix: number): Promise<StreetDefect[]> {
    return this.http.get<IResponse>(`${environment.API_BASE_URL}/street-defects?lat=${lat}&lng=${lng}&radix=${radix}`)
      .toPromise()
      .then(response => response.data as StreetDefect[])
      .catch(err => {
        console.log(err)
      })
  }
}

interface IResponse {
  message: string;
  success: boolean;
  data: any
}
