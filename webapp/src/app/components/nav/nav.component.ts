import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
declare let gapi: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => {
        this.authService.logout();
        console.log('User signed out.');
      });
  }
}
