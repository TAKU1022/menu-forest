import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  changeUserName(userId: string, name: string): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      name,
    });
  }

  async changeUserAvater(userId: string, message: string): Promise<void> {
    const result = await this.storage
      .ref(`users/${userId}`)
      .putString(message, 'data_url');
    const avaterURL = await result.ref.getDownloadURL();
    return this.db.doc<User>(`users/${userId}`).update({
      avaterURL,
    });
  }

  initializeUserIsEatenFood(userId: string): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      isEatenBreakfast: false,
      isEatenLunch: false,
      isEatenDinner: false,
    });
  }

  changeUserIsEatenFood(
    userId: string,
    time: number,
    isEaten: boolean
  ): Promise<void> | void {
    switch (time) {
      case 0:
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenBreakfast: isEaten,
        });
      case 1:
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenLunch: isEaten,
        });
      case 2:
        return this.db.doc<User>(`users/${userId}`).update({
          isEatenDinner: isEaten,
        });
      default:
        return alert('失敗');
    }
  }

  changeEatCount(userId: string, eatCount: number): Promise<void> {
    return this.db.doc<User>(`users/${userId}`).update({
      eatCount,
    });
  }
}
