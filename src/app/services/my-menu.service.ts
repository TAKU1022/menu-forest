import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  MyMenu,
  DayMenu,
  DayMenuWithFood,
  MyMenuWithFood,
} from '@interfaces/my-menu';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class MyMenuService {
  dayOfWeeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];

  constructor(private db: AngularFirestore, private foodService: FoodService) {}

  createMyMenu(myMenu: Omit<MyMenu, 'myMenuId'>): Promise<void> {
    const myMenuId = this.db.createId();
    return this.db.doc(`userMenus/${myMenuId}`).set({
      myMenuId,
      ...myMenu,
    });
  }

  updateMyMenu() {}

  deleteMyMenu() {}

  getMyMenuById(userId: string): Observable<MyMenu[]> {
    return this.db
      .collection<MyMenu>('userMenus', (ref) => {
        return ref.where('creatorId', '==', userId);
      })
      .valueChanges();
  }

  getMyMenuWithFood(userId: string): Observable<MyMenuWithFood> {
    return this.getMyMenuById(userId).pipe(
      map((myMenus: MyMenu[]) => myMenus[0]),
      map((myMenu: MyMenu) => myMenu.day),
      map((day) => {
        const days: DayMenu[] = [
          day.sunday,
          day.monday,
          day.tuesday,
          day.wednesday,
          day.thursday,
          day.friday,
          day.saturday,
        ];
        return days;
      }),
      switchMap(
        (dayMenus: DayMenu[]): Observable<MyMenuWithFood> => {
          const dayMenuWithFoods$: Observable<DayMenuWithFood>[] = dayMenus.map(
            (dayMenu: DayMenu) => {
              return combineLatest([
                this.foodService.getFoodById(dayMenu.breakfastId),
                this.foodService.getFoodById(dayMenu.lunchId),
                this.foodService.getFoodById(dayMenu.dinnerId),
              ]).pipe(
                map(([breakfast, lunch, dinner]) => {
                  return {
                    breakfast,
                    lunch,
                    dinner,
                    dayOfWeek: '',
                  };
                })
              );
            }
          );

          return combineLatest(dayMenuWithFoods$).pipe(
            map((dayMenuWithFoods: DayMenuWithFood[]) => {
              for (let i = 0; i < 7; i++) {
                dayMenuWithFoods[i].dayOfWeek = this.dayOfWeeks[i];
              }
              return {
                sundayFood: dayMenuWithFoods[0],
                mondayFood: dayMenuWithFoods[1],
                tuesdayFood: dayMenuWithFoods[2],
                wednesdayFood: dayMenuWithFoods[3],
                thursdayFood: dayMenuWithFoods[4],
                fridayFood: dayMenuWithFoods[5],
                saturdayFood: dayMenuWithFoods[6],
              };
            })
          );
        }
      )
    );
  }

  getTodayMenu(userId: string): Observable<DayMenuWithFood> {
    return this.getMyMenuWithFood(userId).pipe(
      map((myMenuWithFood: MyMenuWithFood) => {
        const weekMenu: DayMenuWithFood[] = [
          myMenuWithFood.sundayFood,
          myMenuWithFood.mondayFood,
          myMenuWithFood.tuesdayFood,
          myMenuWithFood.wednesdayFood,
          myMenuWithFood.thursdayFood,
          myMenuWithFood.fridayFood,
          myMenuWithFood.saturdayFood,
        ];
        return weekMenu;
      }),
      map((dayMenuWithFoods: DayMenuWithFood[]) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        return dayMenuWithFoods[dayOfWeek];
      })
    );
  }
}
