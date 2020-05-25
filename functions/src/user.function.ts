import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  return db.doc(`users/${user.uid}`).set({
    id: user.uid,
    name: user.displayName,
    avaterURL: user.photoURL,
    email: user.email,
    createAt: new Date(),
  });
});

export const deleteUser = functions.auth.user().onDelete((user) => {
  return db.doc(`users/${user.uid}`).delete();
});
