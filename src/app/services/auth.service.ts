import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afUser$.subscribe((user) => console.log(user));
  }

  facebookLogin() {
    return this.afAuth.signInWithPopup(
      new auth.FacebookAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  twrtterLogin() {
    return this.afAuth.signInWithPopup(
      new auth.TwitterAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  googleLogin() {
    return this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
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
