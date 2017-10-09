import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare let gapi: any;

@Injectable()
export class AuthenticationService {

  redirectUrl: string;

  constructor(private http: Http) {
  }

  login(token) {
    let body = {
      token: token
    };
    return this.http.post(`${environment.API_BASE_URL}/authenticate`, body)
      .toPromise()
      .then(response => {
        let res = response.json();

        if(res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('name', res.data.user.name);
          localStorage.setItem('email', res.data.user.email);
        }
        return res;
      })
      .catch(err => console.log(err))
  }

  // TODO: strengthen this security
  isLoggedIn(): boolean {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}
