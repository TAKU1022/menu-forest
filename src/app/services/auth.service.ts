import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
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
    this.afUser$.pipe(take(1)).subscribe((user: User) => {
      this.userId = user && user.uid;
      console.log(user);
    });
  }

  loginWithFacebook() {
    return this.afAuth.signInWithPopup(
      new auth.FacebookAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  loginWithTwitter() {
    return this.afAuth.signInWithPopup(
      new auth.TwitterAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/welcome');
    });
  }

  createUser(params: { email: string; password: string }) {
    return this.afAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((result) => {
        result.user.sendEmailVerification();
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('このアドレスは既に登録されています。');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  loginWithEmail(params: { email: string; password: string }) {
    return this.afAuth
      .signInWithEmailAndPassword(params.email, params.password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('このメールアドレスのユーザーは見つかりません');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('このメールアドレスのユーザーは見つかりません');
          break;
        case 'auth/wrong-password':
          alert('パスワードが間違っています');
          break;
        case 'auth/invalid-email':
          alert('メールアドレスが不正です');
          break;
      }
    });
  }
}
