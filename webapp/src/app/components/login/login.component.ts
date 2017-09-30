import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

declare global {
  interface Window {
    onSignIn;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http) {
  }

  ngOnInit() {
    window.onSignIn = this.onSignIn;
  }

  onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log(profile);
  }

}
