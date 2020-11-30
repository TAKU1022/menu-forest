import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '@interfaces/food';
import { firestore } from 'firebase';

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

  getFoods(
    lastFood: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    foods: Food[];
    lastFoodDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  }> {
    return this.db
      .collection<Food>('foods', (ref) => {
        if (lastFood) {
          return ref.startAfter(lastFood).limit(24);
        } else {
          return ref.limit(12);
        }
      })
      .get({ source: 'server' })
      .pipe(
        map((snap: firestore.QuerySnapshot<firestore.DocumentData>) => {
          const foods: Food[] = snap.docs.map(
            (doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>) =>
              doc.data() as Food
          );
          const lastFoodDocument: firestore.QueryDocumentSnapshot<firestore.DocumentData> =
            snap.docs[snap?.docs.length - 1];
          return {
            foods,
            lastFoodDocument,
          };
        })
      );
  }

  getFoodById(id: string): Observable<Food> {
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
