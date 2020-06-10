import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  changeUserName(userId: string, name: string) {
    return this.db.doc(`users/${userId}`).update({
      name,
    });
  }

  async changeUserAvater(userId: string, message: string) {
    const result = await this.storage
      .ref(`users/${userId}`)
      .putString(message, 'data_url');
    const avaterURL = await result.ref.getDownloadURL();
    this.db.doc(`users/${userId}`).update({
      avaterURL,
    });
  }
}
