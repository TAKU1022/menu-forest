import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      uid: user.uid,
      name: user.displayName,
      avaterURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
      admin: false,
      eatCount: 0,
      isEatenBreakfast: false,
      isEatenLunch: false,
      isEatenDinner: false,
    });
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
  });
