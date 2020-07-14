import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyMenu, DayMenu, DayMenuWithFood } from '@interfaces/my-menu';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class MyMenuService {
  dayOfWeeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];

  constructor(private db: AngularFirestore, private foodService: FoodService) {}

  getMyMenuByUserId(userId: string): Observable<MyMenu> {
    return this.db
      .collection<MyMenu>('myMenus', (ref) => {
        return ref.where('creatorId', '==', userId);
      })
      .valueChanges()
      .pipe(map((myMenus: MyMenu[]) => myMenus[0]));
  }

  getDayMenuWithFoods(userId: string): Observable<DayMenuWithFood[]> {
    return this.getMyMenuByUserId(userId).pipe(
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
        (dayMenus: DayMenu[]): Observable<DayMenuWithFood[]> => {
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
              return dayMenuWithFoods;
            })
          );
        }
      )
    );
  }

  getTodayMenu(userId: string): Observable<DayMenuWithFood> {
    return this.getDayMenuWithFoods(userId).pipe(
      map((dayMenuWithFoods: DayMenuWithFood[]) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        return dayMenuWithFoods[dayOfWeek];
      })
    );
  }
}
