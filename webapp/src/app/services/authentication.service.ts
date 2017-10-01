import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {

  }

  login(token) {
    let body = {
      token: token
    };
    return this.http.post(`${environment.API_BASE_URL}/authenticate`, body)
      .toPromise()
      .then(response => response.json())
  }
}
