import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';
@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    // This code gets the return URL from query then saves it in localstorage
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(this.googleProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$ (): Observable<AppUser> {
    return this.user$
        .switchMap(user => {
          if (user) {
            return this.userService.get(user.uid);
          }else {
            return Observable.of(null);
          }
        });
  }
}
