import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    window.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    this.authService.login(id_token)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.user.name);
        localStorage.setItem('email', res.data.user.email);

        this.router.navigate(['/map']);
      });
  }

}
