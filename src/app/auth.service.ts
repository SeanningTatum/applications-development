import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  googleProvider = new firebase.auth.GoogleAuthProvider();
  constructor(private afAuth: AngularFireAuth) { }

  login() {
    this.afAuth.auth.signInWithRedirect(this.googleProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
