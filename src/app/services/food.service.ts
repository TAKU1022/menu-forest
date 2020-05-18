import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from '../interfaces/food';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createFood(food: Food) {
    const id = this.db.createId();
    return this.db
      .doc(`foods/${id}`)
      .set(food)
      .then(() => {
        this.snackBar.open('メニューを作成しました！', null, {
          duration: 3000,
        });
      });
  }

  getFood(): Observable<Food[]> {
    return this.db.collection<Food>('foods').valueChanges();
  }
}
