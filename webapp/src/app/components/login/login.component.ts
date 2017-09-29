import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private clientId: string = '238180417493-rt7vceimdfi6n10do1kqmf04nle1fcjo.apps.googleusercontent.com';
  private redirectUri: string = 'http://localhost:4200';
  private responseType: string = 'token';
  private scope: string = 'email';

  constructor(private http: Http) { }

  ngOnInit() {

  }

  onLogin() {
    console.log("onLogin");
    this.http.get(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_ui=${this.redirectUri}&response_type=${this.responseType}&scope=${this.scope}`)
      .toPromise()
      .then( response => {
        let r = response.json();
        console.log(r);
      })
  }

}
