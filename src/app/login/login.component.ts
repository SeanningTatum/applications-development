import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    this.af.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
