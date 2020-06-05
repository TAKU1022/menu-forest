import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '@interfaces/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private db: AngularFirestore) {}

  createFood(food: Omit<Food, 'foodId'>): Promise<void> {
    const foodId = this.db.createId();
    return this.db.doc(`foods/${foodId}`).set({
      foodId,
      ...food,
    });
  }

  getFood(): Observable<Food[]> {
    return this.db.collection<Food>('foods').valueChanges();
  }

  getFoodId(id: string): Observable<Food> {
    return this.db.doc<Food>(`foods/${id}`).valueChanges();
  }

  getDayFood(): Observable<Food> {
    return this.db
      .collection<Food>('foods')
      .valueChanges()
      .pipe(
        map((foods) => {
          return foods[Math.floor(Math.random() * foods.length)];
        })
      );
  }
}
