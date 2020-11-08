import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';

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

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.afUser$.subscribe((user: firebase.User) => {
      this.userId = user && user.uid;
      console.log(user);
    });
  }

  loginWithGoogle(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/welcome');
    });
  }
}
