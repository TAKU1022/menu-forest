import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth) {
    this.afUser$.subscribe((user) => console.log(user));
  }

  facebookLogin() {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  twrtterLogin() {
    return this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  googleLogin() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  yahooLogin() {
    return this.afAuth.signInWithPopup(new auth.OAuthProvider('yahoo.com'));
  }

  logout() {
    this.afAuth.signOut();
  }
}
