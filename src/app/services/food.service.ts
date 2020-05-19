import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Food } from '../interfaces/food';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  id = this.db.createId();

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createFood(food: Food) {
    return this.db
      .doc(`foods/${this.id}`)
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

  getFoodId(id: string): Observable<Food> {
    return this.db.doc<Food>(`foods/${id}`).valueChanges();
  }
}
