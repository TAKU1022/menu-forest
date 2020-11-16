import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser$: Observable<firebase.User> = this.afAuth.user;
  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser: firebase.User) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );
  userId: string;
  isInitialLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.afUser$.subscribe((user: firebase.User) => {
      this.userId = user && user.uid;
      console.log(user);
    });
  }

  loginWithGoogle(): Promise<void> {
    const googleAuthProvider = new auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth
      .signInWithPopup(googleAuthProvider)
      .then((result: auth.UserCredential) => {
        this.isInitialLogin = result.additionalUserInfo.isNewUser;
        this.snackBar.open('ようこそ！', null);
        this.router.navigateByUrl('/');
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.snackBar.open('またお越しください！', null);
      this.router.navigateByUrl('/welcome');
    });
  }
}
