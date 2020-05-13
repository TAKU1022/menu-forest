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

  emailLogin(params: { email: string; password: string }) {
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
