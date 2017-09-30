import { Component, OnInit } from '@angular/core';

declare let gapi: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => {
        console.log('User signed out.');
      });
  }
}
